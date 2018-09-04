'use strict'
const consoleColors = require('./consoleColors')
const fs = require('fs-extra')

/**
 * Generates Sass file from local template.
 * @argument {string} filepath a path for the file
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} humanname human readable name of the component
 * @argument {string} type type of the block. Can be component or layout
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success 
 */
module.exports = (filepath, machinename, humanname, type, description, cb = () => null) => {
  console.log(consoleColors.fronthack, 'Creating new Sass file from template...')
  let templatePath = 'src/sass/components/!TEMPLATE.sass'
  if (type == 'layout') {
    templatePath = 'src/sass/layout/!TEMPLATE.sass'
  }
  fs.copy(templatePath, filepath, err => {
    if (err) throw err
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) throw err
      const content = data.replace('Template', humanname).replace(/template/gi, machinename).replace('!TEMPLATE', machinename).replace('Component description', description)
      return cb(null, content, filepath)
    })
  })
}
