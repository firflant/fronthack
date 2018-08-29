'use strict'
const commandLineCommands = require('command-line-commands')

const commandInit = require('./commands/init')
const commandCreateReactApp = require('./commands/createReactApp')
const commandComponent = require('./commands/component')
const commandReactComponent = require('./commands/reactComponent')
const commandLayout = require('./commands/layout')
const commandPage = require('./commands/page')
const commandDesign = require('./commands/design')
const commandList = require('./commands/list')
const commandHelp = require('./commands/help')
const isReactApp = require('./helpers/isReactApp')


const validCommands = [
  null,
  'init',
  'create-react-app',
  'component',
  'layout',
  'page',
  'design',
  'list',
  'help'
]
const { command, argv } = commandLineCommands(validCommands)

switch (command) {
  case 'init':
    commandInit()
    break

  case 'create-react-app':
    commandCreateReactApp()
    break

  case 'component':
    isReactApp((err, itIs) => {
      if (err) throw err
      if (itIs) {
        commandReactComponent()
      } else {
        commandComponent()
      }
    })
    break

  case 'layout':
    commandLayout()
    break
  
  case 'page':
    commandPage()
    break

  case 'design':
    commandDesign()
    break

  case 'list':
    commandList()
    break

  case 'help':
    commandHelp()
    break

  case null:
    console.log('You did not passed any operation. Type \'fronthack help\' for help.')
    break
}
