'use strict'
const fs = require('fs-extra')
const changeCase = require('case')
const { getInstalledPath } = require('get-installed-path')
const consoleColors = require('./consoleColors')
// const reactComponentTemplate = require('./templates/react-component.js')

/**
 * Checks if component of given name exists in Fronthack repository and returns
 * it's Sass
 * @argument {string} projectRoot root path of the current project
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success 
 */
module.exports = (projectRoot, type, machinename, description = null, cb = () => null) => {
  getInstalledPath('fronthack').then((path) => {
    if (type === 'page') {
      fs.ensureDir(`${projectRoot}/src/${type}s`, (err) => {
        if (err) throw err
        fs.readFile(`${path}/lib/templates/react-page.js`, 'utf8', (err, reactPage) => {
          let parsedReactPage = reactPage
            .replace(/PageName/g, machinename)
          if (description) parsedReactComponent = parsedReactPage.replace('Description', description)
          fs.writeFile(`${projectRoot}/src/${type}s/${machinename}.js`, parsedReactPage, (err) => {
            if (err) throw err
            console.log(consoleColors.fronthack, 'Done!')
          })
        })
      })
    } else {
      fs.ensureDir(`${projectRoot}/src/${type}s/${machinename}`, (err) => {
        if (err) throw err
        // Fetch React component template
        fs.readFile(`${path}/lib/templates/react-component.js`, 'utf8', (err, reactComponent) => {
          if (err) throw err
          const kebabCase = changeCase.kebab(machinename)
          const humanCase = changeCase.sentence(machinename)
          let parsedReactComponent = reactComponent
            .replace(/ComponentName/g, machinename)
            .replace('component-name', `${(type === 'layout') ? 'layout-' : ''}${kebabCase}`)
          if (description) parsedReactComponent = parsedReactComponent.replace('Description', description)
          fs.writeFile(`${projectRoot}/src/${type}s/${machinename}/${machinename}.js`, parsedReactComponent, (err) => {
            if (err) throw err
            // Fetch sass template
            fs.readFile(`${path}/lib/templates/sass-component.sass`, 'utf8', (err, sassContent) => {
              let parsedSassContent = sassContent
                .replace('Name', humanCase)
                .replace(/name/g, `${(type === 'layout') ? 'layout-' : ''}${kebabCase}`)
              if (description) parsedSassContent = parsedSassContent.replace('Description', description)
              fs.writeFile(`${projectRoot}/src/${type}s/${machinename}/style.sass`, parsedSassContent, (err) => {
                if (err) throw err
                // Fetch index file template
                fs.readFile(`${path}/lib/templates/react-component-index.js`, 'utf8', (err, indexFile) => {
                  if (err) throw err
                  let parsedIndexFile = indexFile
                    .replace('ComponentName', machinename)
                  fs.writeFile(`${projectRoot}/src/${type}s/${machinename}/index.js`, parsedIndexFile, (err) => {
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