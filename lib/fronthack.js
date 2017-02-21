'use strict'
const commandLineCommands = require('./command-line-commands')
const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')
const install = require('npm-install-package')
const fs = require('fs-extra')
const shell = require('shelljs/global');

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
            cd('fronthack');
            // Download all dependencies
            echo('Installing project dependencies...');
            if (exec('npm install').code !== 0) {
              echo('Installing dependencies failed');
              exit(1);
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
      echo('Error! Exiting.');
      exit(1);
    }
    break

  case 'add':
    if (exec('./bin/add.sh').code !== 0) {
      echo('Error while executing bash script! Exiting.');
      exit(1);
    }
    break

  case 'purgestyleguide':
    if (exec('./bin/purge_styleguide.sh').code !== 0) {
      echo('Error while executing bash script! Exiting.');
      exit(1);
    }
    break

  case 'help':
    const sections = [
    {
      header: 'Fronthack CLI',
      content: 'Command line interface for Fronthack'
    },
    {
      header: 'Synopsis',
      content: '$ fronthack <command>'
    },
    {
      header: 'Commands',
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
          name: 'purgestyleguide',
          description: 'Remove all styleguide files and related data from the project. Run it if you do not need a styleguide'
        },
        {
          name: 'help',
          description: 'Outputs this info'
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
