'use strict'
const commandLineCommands = require('./command-line-commands')
const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')

const validCommands = [
  null,
  'init',
  'watch',
  'newcomponent',
  'purgestyleguide',
  'help'
]
const { command, argv } = commandLineCommands(validCommands)

switch (command) {
  case 'init':
    console.log('Initiating Fronthack working directory for the project')
    break

  case 'watch':
    console.log('Watching for changes inside the project...')
    break

  case 'newcomponent':
    console.log('Type a machinename for your component' )
    break

  case 'purgestyleguide':
    console.log('Removing styleguide files' )
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
          name: 'newcomponent',
          description: 'Guides you through new component creation process'
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
