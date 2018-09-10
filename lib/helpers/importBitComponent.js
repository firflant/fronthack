'use strict'

const shell = require('shelljs')
const fs = require('fs-extra')
const changeCase = require('case')
const consoleColors = require('./consoleColors')
const generateReactComponent = require('./generateReactComponent')

/**
 * Checks if there is component of given name of Fronthack git scope and imports
 * it, or loads createComponent functio if it is not.
 * @argument {string} projectRoot root path of the current project
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success 
 */
module.exports = (projectRoot, type, machinename, description, cb = () => null) => {
  console.log(consoleColors.fronthack, 'Connecting to a Fronthack Bit scope...')
  const kebabCase = changeCase.kebab(machinename)
  shell.exec(`bit import frontcraft.fronthack/${type}s/${kebabCase} --path ${projectRoot}/src${(type === 'global') ? `/${kebabCase}` : ''} --skip-npm-install --ignore-package-json --ignore-dist`, {async: true, silent: true}, (code) => {
    if (code != 0) {
      if (type === 'component') {
        console.log(consoleColors.fronthack, `There is no ready fronthack component with name of ${kebabCase}. Generating a new blank one...`)
        generateReactComponent(projectRoot, type, machinename, description)
      } else {
        console.log(consoleColors.fronthack, `There is no ready fronthack ${type} with name of ${kebabCase}.`)
      }
    } else {
      if (type === 'component') console.log(consoleColors.fronthack, 'Found fronthack component of given name and imported its code.')
      fs.remove(`src/${type}s/${machinename}/LICENSE`)
      fs.remove(`src/${type}s/${machinename}/static.html`)
    }
    cb(null);
  })
}