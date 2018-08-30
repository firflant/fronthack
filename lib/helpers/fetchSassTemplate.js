'use strict'
const consoleColors = require('./consoleColors')
const fs = require('fs-extra')

/**
 * Generates Sass file from local template.
 */
module.exports = (filepath, machinename, humanname, type, description, cb) => {
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
