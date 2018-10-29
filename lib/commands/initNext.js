'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const shell = require('shelljs')
const ncp = require('ncp').ncp
const getFronthackPath = require('../helpers/getFronthackPath')

const consoleColors = require('../helpers/consoleColors')
const importBitComponent = require('../helpers/importBitComponent')
const regex = require('../helpers/regex')


module.exports = () => {
  const initSchema = {
    properties: {
      name: {
        description: 'Directory of installation',
        type: 'string',
        pattern: regex.projectName,
        message: 'Name must be only letters, numbers dashes or underscores',
        default: 'fronthack-next'
      }
    }
  }
  prompt.start()
  prompt.get(initSchema, (err, result) => {
    if (result.name === 'fronthack') {
      throw new Error('Name should be different than fronthack')
    }
    console.log(consoleColors.fronthack, 'Initiating Fronthack directory for new project...')
    const fronthackPath = `${process.cwd()}/${result.name}`
    // Copy static-repo file tree template
    getFronthackPath(path => {
      ncp(`${path}/lib/templates/next-repo`, fronthackPath, (err) => {
        shell.cd(result.name)
        if (err) throw err
        // Prepare designs directory.
        fs.ensureDir(`${fronthackPath}/designs`, (err) => {
          if (err) throw err
          fs.readFile(`${path}/lib/templates/designs-readme.md`, 'utf8', (err, content) => {
            if (err) throw err
            fs.writeFile(`${fronthackPath}/designs/README.md`, content, (err) => {
              if (err) throw err
              // .gitignore_template is not named just .gitignore because when
              // Fronthack is installed globally with yarn, yarn not
              fs.rename(`${fronthackPath}/.gitignore_template`, `${fronthackPath}/.gitignore`, (err) => {
                if (err) throw err;
                shell.cd(fronthackPath)
                console.log(consoleColors.fronthack, 'Installing node dependencies...')
                // Install dependencies
                shell.exec('yarn install && yarn add --dev fronthack-scripts', { async: true, silent: false }, (code) => {
                  if (code != 0) throw new Error('Installing dependencies failed')
                  // Initiate bit and import global components.
                  shell.exec('bit init', { async: true }, (code) => {
                    if (code != 0) throw new Error('Error: Could not initiate Bit');
                    fs.readFile(`${fronthackPath}/bit.json`, 'utf8', (err, content) => {
                      if (err) throw err
                      const newContent = content
                        .replace('\"componentsDefaultDirectory\": \"components', '\"componentsDefaultDirectory\": \"src')
                        .replace('\"packageManager\": \"npm\"', '\"packageManager\": \"yarn\"')
                      fs.writeFile(`${fronthackPath}/bit.json`, newContent, (err) => {
                        if (err) throw err
                        importBitComponent(fronthackPath, 'global', 'style', null, (err) => {
                          if (err) throw err
                          shell.exec('bit link', { async: true }, (code) => {
                            if (err) throw err
                            // Do initial git commit.
                            shell.exec('git init', { async: true }, (code) => {
                              if (code != 0) throw new Error('Error: Could not initiate Bit');
                              shell.exec('git add .', {async: true, silent: true}, (code) => {
                                if (code != 0) throw new Error('Error: Could not use git');
                                shell.exec('git commit -m "Repository initiated by fronthack"', {async: true, silent: true}, (code) => {
                                  if (code != 0) throw new Error('Error: Could not use git');
                                  console.log(consoleColors.fronthack, 'Opinionated Fronthack Next project is ready for hacking! Begin by typing:')
                                  console.log('')
                                  console.log(consoleColors.fronthack, `  cd ${result.name}`)
                                  console.log(consoleColors.fronthack, '  yarn dev')
                                  console.log('')
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}