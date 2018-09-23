'use strict'

const prompt = require('prompt')
const shell = require('shelljs')
const fs = require('fs-extra')
const { getInstalledPath } = require('get-installed-path')
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
        default: 'fronthack-react'
      }
    }
  }
  prompt.start()
  prompt.get(initSchema, (err, result) => {
    console.log(consoleColors.fronthack, 'Creating React app with Fronthack utilities...')
    console.log(consoleColors.fronthack, 'This command is a wrapper of the "Create React App" project.')
    console.log('')
    console.log(consoleColors.fronthack, 'Fronhack philosophy is to generate and hack - automate boilerplate, expose everything for developer, leave nothung under the hood.')
    console.log('')
    // Create React app.
    shell.exec(`npx create-react-app ${result.name}`, { async: true }, (code) => {
      if (code != 0) throw new Error('Error: Creating React app failed')
      shell.cd(result.name)
      // Eject webpack config.
      shell.exec('echo y | yarn eject', { async: true }, (code) => {
        if (code != 0) throw new Error('Error: Could not use yarn');
        const currentPath = process.cwd()
        // Install additional dependencies.
        shell.exec('yarn add fronthack-scripts sass-loader node-sass copy-webpack-plugin', { async: true, silent: true }, (code) => {
          if (code != 0) throw new Error('Error: Adding Fronthack scripts failed')
          getInstalledPath('fronthack').then((path) => {
            // Apply changes in App.js file.
            fs.readFile(`${currentPath}/src/App.js`, 'utf8', (err, content) => {
              if (err) throw err
              const newContent = content.replace('./App.css', './globals/styles/styles.sass')
              fs.writeFile(`${currentPath}/src/App.js`, newContent, (err) => {
                if (err) throw err
                // Perform changes in index.js file.
                fs.readFile(`${path}/lib/templates/fronthack-scripts-import.js`, 'utf8', (err, scriptsImportTemplate) => {
                  if (err) throw err
                  fs.readFile(`${currentPath}/src/index.js`, 'utf8', (err, content) => {
                    if (err) throw err
                    const newContent = content
                      .replace("import './index.css';\n", '')
                      .concat(scriptsImportTemplate)
                    fs.writeFile(`${currentPath}/src/index.js`, newContent, (err) => {
                      if (err) throw err
                      // Remove files that are not used anymore.
                      fs.unlink(`${currentPath}/src/index.css`, (err) => {
                        if (err) throw err
                        fs.unlink(`${currentPath}/src/App.css`, (err) => {
                          if (err) throw err
                          // Inject Fronthack development tools to a Webpack config.
                          fs.readFile(`${path}/lib/templates/webpack.config.sassloader.js`, 'utf8', (err, webpackConfTemplateContent) => {
                            if (err) throw err
                            fs.readFile(`${currentPath}/config/webpack.config.dev.js`, 'utf8', (err, webpackConfContent) => {
                              if (err) throw err
                              const newContent = webpackConfContent
                                .replace('const eslintFormatter', "const CopyWebpackPlugin = require('copy-webpack-plugin');\nconst eslintFormatter")
                                .replace('WatchMissingNodeModulesPlugin(paths.appNodeModules),', "WatchMissingNodeModulesPlugin(paths.appNodeModules),\n    // Copy Fronthack designs\n    new CopyWebpackPlugin([{ from: 'designs', to: 'designs' }]),")
                                .replace('          // "file" loader', `${webpackConfTemplateContent}          // "file" loader`)
                              fs.writeFile(`${currentPath}/config/webpack.config.dev.js`, newContent, (err) => {
                                if (err) throw err
                                // Prepare designs directory.
                                fs.ensureDir(`${currentPath}/designs`, (err) => {
                                  if (err) throw err
                                  fs.readFile(`${path}/lib/templates/designs-readme.md`, 'utf8', (err, content) => {
                                    if (err) throw err
                                    fs.writeFile(`${currentPath}/designs/README.md`, content, (err) => {
                                      if (err) throw err
                                      // Add .bit to gitignore
                                      fs.readFile(`${currentPath}/.gitignore`, 'utf8', (err, content) => {
                                        if (err) throw err
                                        const newContent = `${content}\n.bit`
                                        fs.writeFile(`${currentPath}/.gitignore`, newContent, (err) => {
                                          if (err) throw err
                                          // Initiate bit and import global components.
                                          shell.exec('bit init', { async: true }, (code) => {
                                            if (code != 0) throw new Error('Error: Could not initiate Bit');
                                            fs.readFile(`${currentPath}/bit.json`, 'utf8', (err, content) => {
                                              if (err) throw err
                                              const newContent = content.replace('\"componentsDefaultDirectory\": \"components', '\"componentsDefaultDirectory\": \"src')
                                              fs.writeFile(`${currentPath}/bit.json`, newContent, (err) => {
                                                if (err) throw err
                                                importBitComponent(currentPath, 'global', 'style', null, (err) => {
                                                  if (err) throw err
                                                  // Do initial git commit.
                                                  shell.exec('git init', { async: true }, (code) => {
                                                    if (code != 0) throw new Error('Error: Could not initiate Bit');
                                                    shell.exec('git add .', {async: true, silent: true}, (code) => {
                                                      if (code != 0) throw new Error('Error: Could not use git');
                                                      shell.exec('git commit -m "Repository initiated by fronthack create-react-app command"', {async: true, silent: true}, (code) => {
                                                        if (code != 0) throw new Error('Error: Could not use git');
                                                        console.log(consoleColors.fronthack, 'Opinionated Fronthack React project is ready for hacking! Begin by typing:')
                                                        console.log('')
                                                        console.log(consoleColors.fronthack, `  cd ${result.name}`)
                                                        console.log(consoleColors.fronthack, '  yarn start')
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
