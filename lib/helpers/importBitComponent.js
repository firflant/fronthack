'use strict'

const shell = require('shelljs')
const fs = require('fs-extra')
const consoleColors = require('./consoleColors')
const generateReactComponent = require('./generateReactComponent')

/**
 * Checks if there is component of given name of Fronthack git scope and imports
 * it, or loads createComponent functio if it is not.
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 */
module.exports = (type, machinename, description, cb = () => null) => {
  console.log(consoleColors.fronthack, 'Connecting to Bit scope...')
  shell.exec(`bit import fronthack.fronthack/${type}s/${machinename} --skip-npm-install --ignore-package-json --ignore-dist`, {async: true, silent: true}, (code) => {
    if (code != 0) {
      if (type === 'component') {
        console.log(consoleColors.fronthack, `There is no ready fronthack component of this name. Generating a new blank one...`)
        generateReactComponent(type, machinename, description)
      } else {
        console.log(consoleColors.fronthack, `There is no ready fronthack ${type} of this name.`)
      }
    } else {
      if (type === 'component') console.log(consoleColors.fronthack, 'Found fronthack component of given name and imported its code.')
      fs.remove(`src/${type}s/${machinename}/LICENSE`)
      fs.remove(`src/${type}s/${machinename}/static.html`)
    }
    cb(null);
  })
}