'use strict'
const fs = require('fs-extra')
const changeCase = require('case')
const highlight = require('cli-highlight').highlight
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
  getFronthackPath(fronthackPath => {
    // Fetch sass template
    fs.readFile(`${fronthackPath}/lib/templates/sass-component.sass`, 'utf8', (err, sassContent) => {
      const humanCase = changeCase.sentence(machinename)
      const checkedMachinename = (type === 'layout') ? `layout-${machinename}` : machinename
      let parsedSassContent = sassContent
        .replace('Name', humanCase)
        .replace(/name/g, checkedMachinename)
      if (description) parsedSassContent = parsedSassContent.replace('Description', description)
      fs.writeFile(`${projectRoot}/src/sass/${type}s/_${checkedMachinename}.sass`, parsedSassContent, (err) => {
        if (err) throw err
        addImportToApp(projectRoot, type, checkedMachinename, () => {
          console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
          console.log(consoleColors.fronthack, `New element can have folowing initial HTML markup:\n`)
          console.log(highlight(`<div class="${checkedMachinename}"></div>`, { language: 'html' }))
          console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
        })
      })
    })
  })
}

