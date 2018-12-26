'use strict'
const fs = require('fs-extra')
const changeCase = require('case')
const getFronthackPath = require('../helpers/getFronthackPath')
const consoleColors = require('./consoleColors')


/**
 * Generate blank React component from template.
 * @argument {string} projectRoot path to the directory of current project
 * @argument {bool} isNext whether current project is based on Next JS
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */
module.exports = (projectRoot, isNext, type, machinename, description = null, cb = () => null) => {
  const projectSrc = `${projectRoot}${isNext ? '' : '/src'}`
  getFronthackPath(fronthackPath => {
    let reactComponentTemplatePath
    switch (type) {
      case 'screen':
        reactComponentTemplatePath = `${fronthackPath}/lib/templates/react-screen.js`
        break;

      case 'layout':
        reactComponentTemplatePath = `${fronthackPath}/lib/templates/react-component-functional.js`
        break;

      default:
        reactComponentTemplatePath = isNext
        ? `${fronthackPath}/lib/templates/react-component-functional.js`
        : `${fronthackPath}/lib/templates/react-component-class.js`
        break;
    }

    if (type === 'screen') {
      fs.ensureDir(`${projectSrc}/${type}s`, (err) => {
        if (err) throw err
        fs.readFile(reactComponentTemplatePath, 'utf8', (err, reactScreen) => {
          let parsedReactScreen = reactScreen.replace(/PageName/g, machinename)
          if (isNext) parsedReactScreen = parsedReactScreen.replace("import React from 'react'\n", '')
          fs.writeFile(`${projectSrc}/${type}s/${machinename}.js`, parsedReactScreen, (err) => {
            if (err) throw err
            console.log(consoleColors.fronthack, 'Done!')
          })
        })
      })
    } else {
      fs.ensureDir(`${projectSrc}/${type}s/${machinename}`, (err) => {
        if (err) throw err
        // Fetch React component template
        fs.readFile(reactComponentTemplatePath, 'utf8', (err, reactComponent) => {
          if (err) throw err
          const kebabCase = changeCase.kebab(machinename)
          const humanCase = changeCase.sentence(machinename)
          let parsedReactComponent = reactComponent
            .replace(/ComponentName/g, machinename)
            .replace('component-name', `${(type === 'layout') ? 'layout-' : ''}${kebabCase}`)
          if (isNext) parsedReactComponent = parsedReactComponent.replace("import React from 'react'\n", '')
          if (description) parsedReactComponent = parsedReactComponent.replace('Description', description)
          fs.writeFile(`${projectSrc}/${type}s/${machinename}/${machinename}.js`, parsedReactComponent, (err) => {
            if (err) throw err
            // Fetch sass template
            fs.readFile(`${fronthackPath}/lib/templates/sass-component.sass`, 'utf8', (err, sassContent) => {
              let parsedSassContent = sassContent
                .replace('// Name', "@import '../../style/variables'\n@import '../../style/mixins'\n// Name")
                .replace('Name', humanCase)
                .replace(/name/g, `${(type === 'layout') ? 'layout-' : ''}${kebabCase}`)
              if (description) parsedSassContent = parsedSassContent.replace('Description', description)
              fs.writeFile(`${projectSrc}/${type}s/${machinename}/style.sass`, parsedSassContent, (err) => {
                if (err) throw err
                // Fetch index file template
                fs.readFile(`${fronthackPath}/lib/templates/react-component-index.js`, 'utf8', (err, indexFile) => {
                  if (err) throw err
                  let parsedIndexFile = indexFile
                    .replace('ComponentName', machinename)
                  fs.writeFile(`${projectSrc}/${type}s/${machinename}/index.js`, parsedIndexFile, (err) => {
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