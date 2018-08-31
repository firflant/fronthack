'use strict'
const fs = require('fs-extra')
const changeCase = require('case')
const { getInstalledPath } = require('get-installed-path')
const consoleColors = require('./consoleColors')
// const reactComponentTemplate = require('./templates/react-component.js')

/**
 * Checks if component of given name exists in Fronthack repository and returns
 * it's Sass
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 */
module.exports = (type, machinename, description, cb = () => null) => {
  getInstalledPath('fronthack').then((path) => {
    const currentPath = process.cwd()
    fs.mkdir(`${currentPath}/src/components/${machinename}`, (err) => {
      if (err) throw err
      // Fetch React component template
      fs.readFile(`${path}/lib/templates/react-component.js`, 'utf8', (err, reactComponent) => {
        if (err) throw err
        const kebabCase = changeCase.kebab(machinename)
        const humanCase = changeCase.sentence(machinename)
        let parsedReactComponent = reactComponent
          .replace(/ComponentName/g, machinename)
          .replace('component-name', kebabCase)
        if (description) parsedReactComponent = parsedReactComponent.replace('Description', description)
        fs.writeFile(`${currentPath}/src/components/${machinename}/${machinename}.js`, parsedReactComponent, (err) => {
          if (err) throw err
          // Fetch sass template
          fs.readFile(`${path}/lib/templates/sass-component.sass`, 'utf8', (err, sassContent) => {
            let parsedSassContent = sassContent
              .replace('Name', humanCase)
              .replace(/name/g, kebabCase)
            if (description) parsedSassContent = parsedSassContent.replace('Description', description)
            fs.writeFile(`${currentPath}/src/components/${machinename}/style.sass`, parsedSassContent, (err) => {
              if (err) throw err
              // Fetch index file template
              fs.readFile(`${path}/lib/templates/react-component-index.js`, 'utf8', (err, indexFile) => {
                if (err) throw err
                let parsedIndexFile = indexFile
                  .replace('ComponentName', machinename)
                fs.writeFile(`${currentPath}/src/components/${machinename}/index.js`, parsedIndexFile, (err) => {
                  if (err) throw err
                  console.log(consoleColors.fronthack, 'Done!')
                })
              })
            })
          })
        })
      })
    })
  })
}