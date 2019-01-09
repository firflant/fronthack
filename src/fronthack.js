import commandLineCommands from 'command-line-commands'
import pkgUp from 'pkg-up'

import commandInit from './commands/init'
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
const defineProjectRoot = async () => {
  try {
    const packagePath = await pkgUp.sync()
    if (packagePath) {
      return packagePath.replace('/package.json', '')
    } else {
      throw true
    }
  } catch (err) {
    console.log(consoleColors.error, 'Error: You are not in a Fronthack project scope.')
  }
}


const runCommands = async () => {
  let projectRoot, isReact, isNext

  switch (command) {
    case 'init':
      commandInit()
      break

    case 'component':
      projectRoot = await defineProjectRoot()
      isReact = await isReactApp(projectRoot)
      isNext = await isNextApp(projectRoot)
      commandComponent(projectRoot, isReact, isNext)
      break

    case 'layout':
      projectRoot = await defineProjectRoot()
      isReact = await isReactApp(projectRoot)
      isNext = await isNextApp(projectRoot)
      commandLayout(projectRoot, isReact, isNext)
      break

    case 'page':
      projectRoot = await defineProjectRoot()
      isReact = await isReactApp(projectRoot)
      isNext = await isNextApp(projectRoot)
      commandPage(projectRoot, isReact, isNext)
      break

    case 'design':
      projectRoot = await defineProjectRoot()
      isReact = await isReactApp(projectRoot)
      if (isReact) {
        commandReactDesign(projectRoot)
      } else {
        commandDesign(projectRoot)
      }
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
}

runCommands()
