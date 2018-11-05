'use strict'

const shell = require('shelljs')
const fs = require('fs-extra')
const changeCase = require('case')
const consoleColors = require('./consoleColors')
const generateReactComponent = require('./generateReactComponent')

/**
 * Checks if there is component of given name of Fronthack git scope and imports
 * it, or loads createComponent functio if it is not. It contians exceptional
 * logic for the coponents of global type.
 * @argument {string} path path where to perform the operation
 * @argument {string} type can be 'component', 'layout' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */
module.exports = (path, type, machinename, description, cb = () => null) => {
  const output = (type !== 'global')
  console.log(consoleColors.fronthack, 'Fetching data from a Fronthack Bit scope...')
  const kebabCase = changeCase.kebab(machinename)
  shell.exec(`bit import frontcraft.fronthack/${type}s/${kebabCase} --path ${path}/${(type !== 'global') ? `${type}s/`: ''}${machinename} --skip-npm-install --ignore-package-json --ignore-dist`, {async: true, silent: true}, (code) => {
    if (code !== 0) {
      console.log(consoleColors.fronthack, `There is no ready Fronthack ${type} with name of ${machinename}.`)
      if (output) {
        console.log(consoleColors.fronthack, 'Generating a new blank one...')
        generateReactComponent(path, type, machinename, description)
      }
    } else {
      // Remove unnecessary stuff.
      fs.remove(`${path}/${type}s/${machinename}/LICENSE`)
      fs.remove(`${path}/${type}s/${machinename}/node_modules`)
      fs.remove(`${path}/${type}s/${machinename}/static.html`)
      if (output) console.log(consoleColors.fronthack, `Found Fronthack ${type} of given name and imported its code.`)
    }
    cb(null);
  })
}