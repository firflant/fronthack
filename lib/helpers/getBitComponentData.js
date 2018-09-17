'use strict'

const shell = require('shelljs')
const fs = require('fs-extra')
const changeCase = require('case')
const consoleColors = require('./consoleColors')
const generateSassComponent = require('./generateSassComponent')
const addImportToApp = require('./addImportToApp')


/**
 * Imports data about Bit component using yarn instead of a Bit CLI, then makes
 * usage of that, then removes it from node_modules
 * @argument {string} projectRoot root path of the current project
 * @argument {string} type can be 'component', 'layout' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success 
 */
module.exports = (projectRoot, type, machinename, description, cb = () => null) => {
  const output = (type !== 'global')
  console.log(consoleColors.fronthack, 'Connecting to a Fronthack Bit scope...')
  shell.exec(`yarn add @bit/frontcraft.fronthack.${type}s.${kebabCase}`, {async: true, silent: true}, (code) => {
    if (code !== 0) {
      console.log(consoleColors.fronthack, `There is no ready Fronthack ${type} with the name of ${kebabCase}.`)
      if (output) {
        console.log(consoleColors.fronthack, 'Generating a new blank one...')
        generateSassComponent(projectRoot, type, machinename, description)
      }
    } else {
      // TODO: Read static.html and display it on the screen
      // TODO: Copy style.sass to src/sass/${components or layout}
      addImportToApp(projectRoot, type, machinename, () => {
        // TODO: Remove installed instance of that component
        if (output) console.log(consoleColors.fronthack, `Found Fronthack ${type} of given name and imported its code.`)
      })
    }
  })
}