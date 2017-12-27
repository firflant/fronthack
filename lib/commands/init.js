'use strict'

const fs = require('fs-extra')
const install = require('npm-install-package')
const prompt = require('prompt')
const shell = require('shelljs/global')

const purgeStyleguide = require('../helpers/purge-styleguide')
const {consoleColors} = require('../helpers/console-colors')


module.exports = function() {
  const initSchema = {
    properties: {
      name: {
        description: 'Directory of installation',
        type: 'string',
        pattern: /^[a-zA-Z\-\_]+$/,
        message: 'Name must be only letters, dashes or underscores',
        default: 'fronthack'
      }
    }
  }
  prompt.start()
  prompt.get(initSchema, function (err, result) {
    console.log(consoleColors.fronthack, 'Initiating Fronthack directory for new project...')
    console.log('')
    // Download Fronthack
    install(['fronthack-repo'], {}, function (err) {
      if (err) throw err
      console.log('Frontcraft package downloaded.')
      // Move from node_modules
      const currentPath = process.cwd()
      const fronthackPath = `${currentPath}/${result.name}`
      fs.move(`${currentPath}/node_modules/fronthack-repo`, fronthackPath, function (err) {
        if (err) throw err
        console.log('Package moved outside the node_modules directory.')
        // Delete node_modules if empty
        fs.emptyDir(`${currentPath}/node_modules`, function (err) {
          fs.remove(`${currentPath}/node_modules`, function (err) {
            if (err) throw err
            console.log('Empty node_modules directory removed.')
            // Go to new Fronthack directory
            cd(result.name)
            // Rename gitignore file
            fs.move(`${fronthackPath}/.gitignore-installed`, `${fronthackPath}/.gitignore`, function (err) {
              if (err) throw err
              // Remove all components except few
              fs.readdir(`${fronthackPath}/src/sass/components`, function (err, files) {
                if (err) throw err
                // Remove from array elements that must stay.
                files.remove('!TEMPLATE.sass').remove('README.md').remove('_btn.sass').remove('_icon.sass')
                fs.readFile(`${fronthackPath}/src/sass/app.sass`, 'utf8', (err, data) => {
                  if (err) throw err
                  files.forEach(function (file) {
                    const name = file.replace('_', '').replace('.sass', '')
                    data = data.replace(`@import "components/${name}"\n`, '')
                    fs.remove(`${fronthackPath}/src/sass/components/${file}`, function (err) {
                      if (err) throw err
                    })
                  })
                  fs.writeFile(`${fronthackPath}/src/sass/app.sass`, data, (err) => {
                    if (err) throw err
                    console.log('Components cleanup done.')
                    // Purge styleguide
                    purgeStyleguide(fronthackPath, function (err) {
                      if (err) throw err
                      // Remove GitHub REARME file content and replace it with readme for existing projects.
                      fs.remove(`${fronthackPath}/README.md`, function (err) {
                        if (err) throw err
                        fs.move(`${fronthackPath}/readme-installed.md`, `${fronthackPath}/README.md`, function (err) {
                          if (err) throw err
                          // Download all dependencies
                          console.log('Installing project dependencies...')
                          if (exec('npm install').code !== 0) {
                            console.log('Installing dependencies failed')
                            exit(1)
                          }
                          console.log(consoleColors.fronthack, `Fronthack innitiated successfully at ${fronthackPath}`)
                          console.log(consoleColors.fronthack, 'You can now navigate to this path and run inside following commands:')
                          console.log(consoleColors.fronthack, '  $ npm run dev         - to watch for changes and run local dev server')
                          console.log(consoleColors.fronthack, '  $ npm run build       - to generate production-ready dist directory')
                          console.log(consoleColors.fronthack, '  $ npm run deploy      - to deploy dist directory to GitHub pages.')
                          console.log(consoleColors.fronthack, '  $ fronthack component - to generate Sass for new BEM component')
                          console.log(consoleColors.fronthack, '  $ fronthack layout    - to generate Sass for layout section')
                          console.log(consoleColors.fronthack, '  $ fronthack list      - to list components available in Fronthack database')
                          console.log(consoleColors.fronthack, '  $ fronthack help      - to get more help!')
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