'use strict'
const commandLineCommands = require('command-line-commands')
const pkgUp = require('pkg-up')

const commandInit = require('./commands/init')
const commandCreateReactApp = require('./commands/createReactApp')
const commandComponent = require('./commands/component')
const commandReactComponent = require('./commands/reactComponent')
const commandLayout = require('./commands/layout')
const commandReactLayout = require('./commands/reactLayout')
const commandPage = require('./commands/page')
const commandReactPage = require('./commands/reactPage')
const commandDesign = require('./commands/design')
const commandReactDesign = require('./commands/reactDesign')
const commandList = require('./commands/list')
const commandHelp = require('./commands/help')
const isReactApp = require('./helpers/isReactApp')
const consoleColors = require('./helpers/consoleColors')


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

/**
 * Defines root path of the project
 * @param {function} cb Callback after success
 */
const defineProjectRoot = (cb) => {
  pkgUp()
    .then(packagePath => {
      if (packagePath) {
        return cb(packagePath.replace('/package.json', ''))
      } else {
        console.log(consoleColors.error, 'Error: You are not in a Fronthack project scope.')
      }
    })
    .catch(() => { console.log(consoleColors.error, 'Error: You are not in a Fronthack project scope.') })
}


switch (command) {
  case 'init':
    commandInit()
    break

  case 'create-react-app':
    commandCreateReactApp()
    break

  case 'component':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, itIs) => {
        if (err) throw err
        if (itIs) {
          commandReactComponent(projectRoot)
        } else {
          commandComponent(projectRoot)
        }
      })
    })
    break

  case 'layout':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, itIs) => {
        if (err) throw err
        if (itIs) {
          commandReactLayout(projectRoot)
        } else {
          commandLayout(projectRoot)
        }
      })
    })
    break
  
  case 'page':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, itIs) => {
        if (err) throw err
        if (itIs) {
          commandReactPage(projectRoot)
        } else {
          commandPage(projectRoot)
        }
      })
    })
    break

  case 'design':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, itIs) => {
        if (err) throw err
        if (itIs) {
          commandReactDesign(projectRoot)
        } else {
          commandDesign(projectRoot)
        }
      })
    })
    break

  case 'list':
    commandList()
    break

  case 'help':
    commandHelp()
    break

  case null:
    console.log(consoleColors.fronthack, 'You did not passed any operation. Type \'fronthack help\' for help.')
    break
}
