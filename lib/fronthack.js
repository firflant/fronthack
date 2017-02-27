'use strict'
const commandLineCommands = require('./command-line-commands')
const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')
const install = require('npm-install-package')
const fs = require('fs-extra')
const shell = require('shelljs/global')
const prompt = require('prompt')
const generateSassContent = require('./generate-sass-content')
Array.prototype.remove = require('remove-value')

const validCommands = [
  null,
  'init',
  'watch',
  'new',
  'purge-styleguide',
  'help'
]
const { command, argv } = commandLineCommands(validCommands)

switch (command) {
  case 'init':
    console.log('Initiating Fronthack working directory for the project...')
    // Download Fronthack
    install(['fronthack'], {}, function (err) {
      if (err) throw err
      console.log('Frontcraft package downloaded.')
      // Move from node_modules
      const currentPath = process.cwd()
      fs.move(`${currentPath}/node_modules/fronthack`, `${currentPath}/fronthack`, function (err) {
        if (err) throw err
        console.log('Package moved outside the node_modules directory.')
        // Delete node_modules if empty
        fs.emptyDir(`${currentPath}/node_modules`, function (err) {
          fs.remove(`${currentPath}/node_modules`, function (err) {
            if (err) throw err
            console.log('Empty node_modules directory removed.')
            // Go to new Fronthack directory
            cd('fronthack')
            // Purge styleguide
            if (exec('./src/bin/purge_styleguide.sh').code !== 0) {
              console.log('Error while executing bash script! Exiting.')
              exit(1)
            }
            // Remove all components except few
            fs.readdir(`${currentPath}/fronthack/src/sass/components`, function (err, files) {
              if (err) throw err
              // Remove from array elements that must stay.
              files.remove('!TEMPLATE.sass').remove('README.txt').remove('_btn.sass').remove('_logo.sass')
              fs.readFile(`${currentPath}/fronthack/src/sass/app.sass`, 'utf8', (err, data) => {
                if (err) throw err
                files.forEach(function (file) {
                  const name = file.replace('_', '').replace('.sass', '')
                  data = data.replace(`@import "components/${name}"\n`, '')
                  fs.remove(`${currentPath}/fronthack/src/sass/components/${file}`, function (err) {
                    if (err) throw err
                  })
                })
                fs.writeFile(`${currentPath}/fronthack/src/sass/app.sass`, data, (err) => {
                  if (err) throw err
                  console.log('Components cleanup done.')
                  // Remove purge_styleguide script because it is useless from now
                  fs.remove(`${currentPath}/fronthack/src/bin`, function (err) {
                    if (err) throw err
                    // Download all dependencies
                    console.log('Installing project dependencies...')
                    if (exec('npm install').code !== 0) {
                      console.log('Installing dependencies failed')
                      exit(1)
                    }
                    console.log('Fronthack Installed successfully!')
                    console.log('You can now navigate to Fronthack\'s directory and run watch command:')
                    console.log('  $ cd fronthack')
                    console.log('  $ fronthack watch')
                  })
                })
              })
            })
          })
        })
      })
    })
    break


  case 'watch':
    console.log('Watching for changes in sass and html-workspace folders...')
    console.log('[Press Ctrl+C to stop]')
    if (exec('npm run dev').code !== 0) {
      console.log('Error! Exiting.')
      exit(1)
    }
    break


  case 'new':
    const schema = {
      properties: {
        machinename: {
          description: 'Machine name of new component',
          type: 'string',
          pattern: /^[a-zA-Z\-]+$/,
          message: 'Name must be only letters or dashes',
          required: true
        },
        description: {
          description: 'It\'s short description',
          type: 'string',
        }
      }
    }
    prompt.start()
    prompt.get(schema, function (err, result) {
      const filename = `_${result.machinename}.sass`
      generateSassContent(result.machinename, result.description, filename, function (err, content, filepath) {
        fs.writeFile(filepath, content, (err) => {
          if (err) throw err
          console.log('New file created at ' + filepath)
          fs.readFile('src/sass/app.sass', 'utf8', (err, data) => {
            if (err) throw err
            const updatedcontent = data.replace('New components', 'New components\n@import "components/' + result.machinename + '"')
            fs.writeFile('src/sass/app.sass', updatedcontent, (err) => {
              if (err) throw err
              console.log('Import declaration added to src/sass/app.sass')
              console.log('Done!')
            })
          })
        })
      })
    })
    break


  case 'purgestyleguide':
    if (exec('./src/bin/purge_styleguide.sh').code !== 0) {
      console.log('Error while executing bash script! Exiting.')
      exit(1)
    }
    break


  case 'help':
    const sections = [
      {
        header: 'Fronthack CLI',
        content: 'Command line interface for Fronthack [underline]{http://fronthack.com}'
      },
      {
        header: 'Usage',
        content: '$ fronthack <command>'
      },
      {
        header: 'Global commands',
        content: [
          {
            name: 'init',
            summary: 'Initiates Fronthack working directory for new project.'
          },
          {
            name: 'help',
            summary: 'Displays this help.'
          }
        ]
      },
      {
        header: 'Project commands',
        content: [
          {
            name: 'watch',
            summary: 'Runs gulp-based task to watch for Sass and HTML changes in **src** directory and compile the output to **dist** directory.\n'
          },
          {
            name: 'new',
            summary: 'Creates new Sass component and receives ready Sass code if it exists in Fronthack\'s repository.\n'
          },
          {
            name: 'purge-styleguide',
            summary: 'Removes all styleguide related data from the project if do not need it.'
          }
        ]
      }
    ]
    const usage = getUsage(sections)
    console.log(usage)
    break


  case null:
    console.log('You did not passed any operation. Enter \'fronthack help\' for help.')
    break
}
