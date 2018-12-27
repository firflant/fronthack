'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const shell = require('shelljs')
const ncp = require('ncp').ncp
const getFronthackPath = require('../helpers/getFronthackPath')

const consoleColors = require('../helpers/consoleColors')
const fetchComponent = require('../helpers/fetchComponent')
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
    const projectRoot = `${process.cwd()}/${result.name}`
    // Copy static-repo file tree template
    getFronthackPath(fronthackPath => {
      ncp(`${fronthackPath}/lib/templates/next-repo`, projectRoot, (err) => {
        shell.cd(result.name)
        if (err) throw err
        // Prepare designs directory.
        fs.ensureDir(`${projectRoot}/designs`, (err) => {
          if (err) throw err
          fs.readFile(`${fronthackPath}/lib/templates/designs-readme.md`, 'utf8', (err, content) => {
            if (err) throw err
            fs.writeFile(`${projectRoot}/designs/README.md`, content, (err) => {
              if (err) throw err
              // .gitignore_template is not named just .gitignore because when
              // Fronthack is installed globally with yarn, yarn not
              fs.rename(`${projectRoot}/.gitignore_template`, `${projectRoot}/.gitignore`, (err) => {
                if (err) throw err;
                shell.cd(projectRoot)
                console.log(consoleColors.fronthack, 'Installing node dependencies...')
                // Install dependencies
                shell.exec('yarn install && yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard', { async: true, silent: false }, (code) => {
                  if (code != 0) throw new Error('Installing dependencies failed')
                  fs.readFile(`${fronthackPath}/lib/templates/fronthack-scripts-import.js`, 'utf8', (err, scriptsImportTemplate) => {
                    if (err) throw err
                    fs.readFile(`${projectRoot}/pages/_app.js`, 'utf8', (err, content) => {
                      if (err) throw err
                      const newContent = content
                        .replace('  render () {', `  componentDidMount() {${scriptsImportTemplate}\n  }\n\n  render () {`)
                      fs.writeFile(`${projectRoot}/pages/_app.js`, newContent, (err) => {
                        if (err) throw err
                        // Add eslint config.
                        fs.readFile(`${fronthackPath}/lib/templates/.eslintrc`, 'utf8', (err, content) => {
                          if (err) throw err
                          fs.writeFile(`${projectRoot}/.eslintrc`, content, (err) => {
                            if (err) throw err
                            fetchComponent(projectRoot, true, true, 'style', null, (err) => {
                              if (err) throw err
                              // Do initial git commit.
                              shell.exec('git init', { async: true }, (code) => {
                                // if (code != 0) throw new Error('Error: Could not initiate git');
                                shell.exec('git add .', {async: true, silent: true}, (code) => {
                                  // if (code != 0) throw new Error('Error: Could not use git');
                                  shell.exec('git commit -m "Repository initiated by fronthack"', {async: true, silent: true}, (code) => {
                                    // if (code != 0) throw new Error('Error: Could not use git');
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
  })
}