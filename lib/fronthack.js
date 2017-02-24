'use strict'
const commandLineCommands = require('./command-line-commands')
const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')
const install = require('npm-install-package')
const fs = require('fs-extra')
const shell = require('shelljs/global')
const prompt = require('prompt')

const validCommands = [
  null,
  'init',
  'watch',
  'add',
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
        if (err) return console.error(err)
        console.log('Package moved outside the node_modules directory.')
        // Delete node_modules if empty
        fs.emptyDir(`${currentPath}/node_modules`, function (err) {
          fs.remove(`${currentPath}/node_modules`, function (err) {
            if (err) return console.error(err)
            console.log('Empty node_modules directory removed.')
            // Go to new Fronthack directory
            cd('fronthack')
            // Download all dependencies
            echo('Installing project dependencies...')
            if (exec('npm install').code !== 0) {
              echo('Installing dependencies failed')
              exit(1)
            }
            console.log('Done! You can navigate now to Fronthack\'s directory and run $ fronthack watch')
          })
        })
      })
    })
    break


  case 'watch':
    console.log('Watching for changes in sass and html-workspace folders...')
    console.log('[Press Ctrl+C to stop]')
    if (exec('npm run dev').code !== 0) {
      echo('Error! Exiting.')
      exit(1)
    }
    break


  case 'add':
    const schema = {
      properties: {
        machinename: {
          description: 'Name of new component',
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
      const humanname = result.machinename + 'human'
      const filepath = 'sass/components/_' + result.machinename + '.sass'
      console.log('  Creating a Sass file for new ' + result.machinename + ' component...')
      fs.copy('sass/components/!TEMPLATE.sass', filepath, err => {
        if (err) throw err
        fs.readFile(filepath, 'utf8', (err, data) => {
          if (err) throw err
          const newcontent = data.replace('Template', humanname).replace(/template/gi, result.machinename).replace('!TEMPLATE', result.machinename).replace('Component description', result.description)
          fs.writeFile(filepath, newcontent, (err) => {
            if (err) throw err
            console.log('New file created at ' + filepath)
            fs.readFile('sass/app.sass', 'utf8', (err, data) => {
              if (err) throw err
              const newcontent = data.replace('New components', 'New components\n@import "components/' + result.machinename + '"')
              fs.writeFile('sass/app.sass', newcontent, (err) => {
                if (err) throw err
                console.log('Import declaration added to sass/app.sass')
              })
            })
          })
        })
      })
    })
    break


  case 'purgestyleguide':
    if (exec('./bin/purge_styleguide.sh').code !== 0) {
      echo('Error while executing bash script! Exiting.')
      exit(1)
    }
    break


  case 'help':
    const sections = [
      {
        header: 'Fronthack CLI',
        content: 'Command line interface for Fronthack'
      },
      {
        header: 'Usage',
        content: '$ fronthack <command>'
      },
      {
        header: 'Avaliable commands',
        optionList: [
          {
            name: 'init',
            description: 'Initiate Fronthack working directory for the project'
          },
          {
            name: 'watch',
            description: 'Run gulp-based task to watch for changes and render the output and CSS'
          },
          {
            name: 'add',
            description: 'Use it to create new component'
          },
          {
            name: 'purge-styleguide',
            description: 'You can remove all styleguide related files and data from the project if do not need it'
          },
          {
            name: 'help',
            description: 'Displays this help'
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
