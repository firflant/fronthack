'use strict'
const fs = require('fs-extra')
const changeCase = require('case')
const getFronthackPath = require('../helpers/getFronthackPath')
const consoleColors = require('./consoleColors')


/**
 * Generate blank React component from template.
 * @argument {string} path path where to perform the operation
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */
module.exports = (path, type, machinename, description = null, cb = () => null) => {
  getFronthackPath(fronthackPath => {
    if (type === 'screen') {
      fs.ensureDir(`${path}/${type}s`, (err) => {
        if (err) throw err
        fs.readFile(`${fronthackPath}/lib/templates/react-screen.js`, 'utf8', (err, reactScreen) => {
          let parsedReactScreen = reactScreen
            .replace(/PageName/g, machinename)
          if (description) parsedReactComponent = parsedReactScreen.replace('Description', description)
          fs.writeFile(`${path}/${type}s/${machinename}.js`, parsedReactScreen, (err) => {
            if (err) throw err
            console.log(consoleColors.fronthack, 'Done!')
          })
        })
      })
    } else {
      fs.ensureDir(`${path}/${type}s/${machinename}`, (err) => {
        if (err) throw err
        // Fetch React component template
        fs.readFile(`${fronthackPath}/lib/templates/react-component.js`, 'utf8', (err, reactComponent) => {
          if (err) throw err
          const kebabCase = changeCase.kebab(machinename)
          const humanCase = changeCase.sentence(machinename)
          let parsedReactComponent = reactComponent
            .replace(/ComponentName/g, machinename)
            .replace('component-name', `${(type === 'layout') ? 'layout-' : ''}${kebabCase}`)
          if (description) parsedReactComponent = parsedReactComponent.replace('Description', description)
          fs.writeFile(`${path}/${type}s/${machinename}/${machinename}.js`, parsedReactComponent, (err) => {
            if (err) throw err
            // Fetch sass template
            fs.readFile(`${fronthackPath}/lib/templates/sass-component.sass`, 'utf8', (err, sassContent) => {
              let parsedSassContent = sassContent
                .replace('Name', humanCase)
                .replace(/name/g, `${(type === 'layout') ? 'layout-' : ''}${kebabCase}`)
              if (description) parsedSassContent = parsedSassContent.replace('Description', description)
              fs.writeFile(`${path}/${type}s/${machinename}/style.sass`, parsedSassContent, (err) => {
                if (err) throw err
                // Fetch index file template
                fs.readFile(`${fronthackPath}/lib/templates/react-component-index.js`, 'utf8', (err, indexFile) => {
                  if (err) throw err
                  let parsedIndexFile = indexFile
                    .replace('ComponentName', machinename)
                  fs.writeFile(`${path}/${type}s/${machinename}/index.js`, parsedIndexFile, (err) => {
                    if (err) throw err
                    console.log(consoleColors.fronthack, 'Done!')
                  })
                })
              })
            })
          })
        })
      })
    }
  })
}