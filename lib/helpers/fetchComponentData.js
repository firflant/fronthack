'use strict'

const shell = require('shelljs')
const fs = require('fs-extra')
const ncp = require('ncp').ncp
const githubGet = require('github-get')
const changeCase = require('case')
const highlight = require('cli-highlight').highlight

const consoleColors = require('./consoleColors')
const generateSassComponent = require('./generateSassComponent')
const addImportToApp = require('./addImportToApp')


/**
 * Saves components data from fronthack-components GitHub repository for static
 * html version.
 * @argument {string} projectRoot root path of the current project
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */
module.exports = (projectRoot, machinename, description, cb = () => null) => {
  // Exceptional behavior for fetching global styles.
  if (machinename === 'style') {
    githubGet('frontcraft/fronthack-components', 'src/style', (err, data, content) => {
      if (err) throw err
      fs.ensureDir(`${projectRoot}/src/sass/base`, (err) => {
        if (err) throw err
        content.forEach(file => {
          githubGet('frontcraft/fronthack-components', `src/style/${file}`, (err, data, content) => {
            if (err) throw err
            fs.writeFile(`${projectRoot}/src/sass/base/${file}`, content, (err) => {
              if (err) throw err
              cb(null)
            })
          })
        })
      })
    })
  } else {
    console.log(consoleColors.fronthack, 'Fetching data from a Fronthack components repository...')
    githubGet('frontcraft/fronthack-components', 'src/components', (err, data, content) => {
      const pascalCase = changeCase.pascal(machinename)
      if (err) throw err
      if (!content.includes(pascalCase)) {
        console.log(consoleColors.fronthack, `There is no ready Fronthack component of name ${machinename}.`)
        console.log(consoleColors.fronthack, 'Generating a new blank one...')
        generateSassComponent(projectRoot, 'component', machinename, description)
      } else {
        githubGet('frontcraft/fronthack-components', `src/components/${pascalCase}/style.sass`, (err, data, content) => {
          if (err) throw err
          const parsedContent = content
            // Remove imports unnecessary for static version
            .replace(/^.*@import.*\n+/gm, '')
            // Exceptional behavior that fixes icon font path.
            .replace('./fonts/waat-icons', '../fonts/waat-icons')
          fs.writeFile(`${projectRoot}/src/sass/components/_${machinename}.sass`, parsedContent, (err) => {
            if (err) throw err
            // Read static.html and display it on the screen
            githubGet('frontcraft/fronthack-components', `src/components/${pascalCase}/README.md`, (err, data, content) => {
              if (err) throw err
              const markup = content.match(/(?<=```html\n)[\s\S]*?(?=\n```)+/m)[0]
              console.log(consoleColors.fronthack, '\n------------------------------------------------------------\n')
              console.log(highlight(markup, { language: 'html' }))
              console.log(consoleColors.fronthack, '\n------------------------------------------------------------\n')
              if (err) throw err
              addImportToApp(projectRoot, 'component', machinename, cb)
            })
          })
        })
      }
    })
  }
}
