import commandLineCommands from 'command-line-commands'
import findUp from 'find-up'

import commandInit from './commands/init'
import commandComponent from './commands/component'
import commandPage from './commands/page'
import commandDesign from './commands/design'
import commandReactDesign from './commands/reactDesign'
import commandList from './commands/list'
import commandHelp from './commands/help'
import commandVersion from './commands/version'
import readConfig from './helpers/readConfig'
import output from './helpers/output'

import 'core-js/stable'
import 'regenerator-runtime/runtime'


const validCommands = [
  null,
  'init',
  'component',
  'page',
  'design',
  'list',
  'help',
  'version',
]
const { command, argv } = commandLineCommands(validCommands)
// Tread first param as a name.
const name = argv.length ? argv[0] : null

/**
 * Defines root path of the project
 */
const defineProjectRoot = async () => {
  try {
    const packagePath = await findUp.sync(['Gemfile', 'package.json'])
    if (packagePath) {
      return packagePath.replace('/package.json', '').replace('/Gemfile', '')
    } else {
      throw true
    }
  } catch (err) {
    output('You are not in a scope of Fronthack project.', 'error')
  }
}


(async () => {
  try {
    let projectRoot, config
    switch (command) {
      case 'init':
        await commandInit(name)
        break

      case 'component':
        projectRoot = await defineProjectRoot()
        config = await readConfig(projectRoot)
        await commandComponent(projectRoot, config, name)
        break

      case 'page':
        projectRoot = await defineProjectRoot()
        config = await readConfig(projectRoot)
        await commandPage(projectRoot, config, name)
        break

      case 'design':
        projectRoot = await defineProjectRoot()
        config = await readConfig(projectRoot)
        if (config.type.includes('react')) {
          await commandReactDesign(projectRoot)
        } else {
          await commandDesign(projectRoot, config)
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

      default:
        output('This is not a valid command. Type \'fronthack help\' for help.', 'warn')
        break
    }
  } catch (err) {
    output('Action cancelled.')
  }
})()
