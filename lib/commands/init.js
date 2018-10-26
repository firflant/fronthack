'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const shell = require('shelljs')
const ncp = require('ncp').ncp
const getFronthackPath = require('../helpers/getFronthackPath')

const consoleColors = require('../helpers/consoleColors')
const getBitComponentData = require('../helpers/getBitComponentData')
const regex = require('../helpers/regex')


module.exports = () => {
  const initSchema = {
    properties: {
      name: {
        description: 'Directory of installation',
        type: 'string',
        pattern: regex.projectName,
        message: 'Name must be only letters, numbers dashes or underscores',
        default: 'fronthack-static'
      }
    }
  }
  prompt.start()
  prompt.get(initSchema, (err, result) => {
    if (result.name === 'fronthack') {
      throw new Error('Name should be different than fronthack')
    }
    console.log(consoleColors.fronthack, 'Initiating Fronthack directory for new project...')
    const currentPath = process.cwd()
    const projectPath = `${currentPath}/${result.name}`
    // Copy static-repo file tree template
    getFronthackPath(fronthackPath => {
      ncp(`${fronthackPath}/lib/templates/static-repo`, projectPath, (err) => {
        if (err) throw err
        // Prepare designs directory.
        fs.ensureDir(`${projectPath}/src/designs`, (err) => {
          if (err) throw err
          fs.readFile(`${fronthackPath}/lib/templates/designs-readme.md`, 'utf8', (err, content) => {
            if (err) throw err
            fs.writeFile(`${projectPath}/src/designs/README.md`, content, (err) => {
              if (err) throw err
              // .gitignore_template is not named just .gitignore because when
              // Fronthack is installed globally with yarn, yarn ignores the
              // .gitignore files.
              fs.rename(`${projectPath}/.gitignore_template`, `${projectPath}/.gitignore`, (err) => {
                if (err) throw err;
                shell.cd(projectPath)
                console.log(consoleColors.fronthack, 'Installing node dependencies...')
                // Install dependencies
                shell.exec('yarn install', { async: true, silent: false }, (code) => {
                  if (code != 0) throw new Error('Installing dependencies failed')
                  // exit(1)
                  // Download global styles
                  getBitComponentData(projectPath, 'global', 'style', null, () => {
                    if (code != 0) throw new Error('Installing global styles failed')
                    // Do initial git commit.
                    shell.exec('git init', { async: true }, (code) => {
                      if (code != 0) throw new Error('Error: Could not initiate Bit');
                      shell.exec('git add .', {async: true, silent: true}, (code) => {
                        if (code != 0) throw new Error('Error: Could not use git');
                        shell.exec('git commit -m "Repository initiated by fronthack init command"', {async: true, silent: true}, (code) => {
                          if (code != 0) throw new Error('Error: Could not use git');
                          console.log(consoleColors.fronthack, `Fronthack innitiated successfully at ${projectPath}`)
                          console.log('')
                          console.log(consoleColors.fronthack, '  yarn start          - to watch for changes and run a local dev server')
                          console.log(consoleColors.fronthack, '  yarn build          - to generate production-ready dist directory')
                          console.log(consoleColors.fronthack, '  yarn deploy         - to deploy dist directory to GitHub pages.')
                          console.log(consoleColors.fronthack, '  fronthack component - to generate Sass for new BEM component')
                          console.log(consoleColors.fronthack, '  fronthack layout    - to generate Sass for layout section')
                          console.log(consoleColors.fronthack, '  fronthack list      - to list components available in Fronthack database')
                          console.log(consoleColors.fronthack, '  fronthack help      - to get more help!')
                          console.log('')
                          console.log(consoleColors.fronthack, 'You can now type:')
                          console.log('')
                          console.log(consoleColors.fronthack, `  cd ${result.name}\n  yarn start`)
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
}