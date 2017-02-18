'use strict'
const commandLineCommands = require('./command-line-commands')
const commandLineArgs = require('command-line-args')

const validCommands = [ null, 'init', 'newcomponent', 'watch', 'purgestyleguide']
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

  case null:
    console.log('You did not passed any fronthack operation.')
    break
}
