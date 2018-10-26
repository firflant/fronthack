'use strict'
const fs = require('fs-extra')
const changeCase = require('case')
const getFronthackPath = require('../helpers/getFronthackPath')
const consoleColors = require('./consoleColors')
const addImportToApp = require('./addImportToApp')


/**
 * Generate blank Sass component from template.
 * @argument {string} projectRoot root path of the current project
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */
module.exports = (projectRoot, type, machinename, description = null, cb = () => null) => {
  getFronthackPath(path => {
    // Fetch sass template
    fs.readFile(`${path}/lib/templates/sass-component.sass`, 'utf8', (err, sassContent) => {
      const humanCase = changeCase.sentence(machinename)
      let parsedSassContent = sassContent
        .replace('Name', humanCase)
        .replace(/name/g, `${(type === 'layout') ? 'layout-' : ''}${machinename}`)
      if (description) parsedSassContent = parsedSassContent.replace('Description', description)
      fs.writeFile(`${projectRoot}/src/sass/${type}s/_${machinename}.sass`, parsedSassContent, (err) => {
        if (err) throw err
        addImportToApp(projectRoot, type, machinename, () => {
          console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
          console.log(consoleColors.fronthack, `New element can have folowing initial HTML markup:\n`)
          console.log(consoleColors.green, `<div class="${(type === 'layout') ? `layout-${machinename}` : machinename}"></div>`)
          console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
        })
      })
    })
  })
}

