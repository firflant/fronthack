import commandLineCommands from 'command-line-commands'
import pkgUp from 'pkg-up'

import commandInit from './commands/init'
import commandInitNext from './commands/initNext'
import commandCreateReactApp from './commands/createReactApp'
import commandComponent from './commands/component'
import commandLayout from './commands/layout'
import commandPage from './commands/page'
import commandDesign from './commands/design'
import commandReactDesign from './commands/reactDesign'
import commandList from './commands/list'
import commandHelp from './commands/help'
import commandVersion from './commands/version'
import isReactApp from './helpers/isReactApp'
import isNextApp from './helpers/isNextApp'
import consoleColors from './helpers/consoleColors'

import "@babel/polyfill"


const validCommands = [
  null,
  'init',
  'init-next',
  'create-react-app',
  'component',
  'layout',
  'page',
  'design',
  'list',
  'help',
  'version',
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

  case 'init-next':
    commandInitNext()
    break

  case 'component':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, isReact) => {
        if (err) throw err
        isNextApp(projectRoot, (err, isNext) => {
          if (err) throw err
          commandComponent(projectRoot, isReact, isNext)
        })
      })
    })
    break

  case 'layout':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, isReact) => {
        if (err) throw err
        isNextApp(projectRoot, (err, isNext) => {
          if (err) throw err
          commandLayout(projectRoot, isReact, isNext)
        })
      })
    })
    break

  case 'page':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, isReact) => {
        if (err) throw err
        isNextApp(projectRoot, (err, isNext) => {
          if (err) throw err
          commandPage(projectRoot, isReact, isNext)
        })
      })
    })
    break

  case 'design':
    defineProjectRoot((projectRoot) => {
      isReactApp(projectRoot, (err, isReact) => {
        if (err) throw err
        if (isReact) {
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

  case 'version':
    commandVersion()
    break

  case null:
    console.log(consoleColors.fronthack, 'You did not passed any operation. Type \'fronthack help\' for help.')
    break
}
