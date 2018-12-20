'use strict'

const fs = require('fs-extra')
const githubGet = require('github-get')
const changeCase = require('case')
const highlight = require('cli-highlight').highlight

const consoleColors = require('./consoleColors')
const generateSassComponent = require('./generateSassComponent')
const generateReactComponent = require('./generateReactComponent')
const addImportToApp = require('./addImportToApp')


/**
 * Saves components data from fronthack-components GitHub repository for static
 * html version.
 * @argument {string} projectRoot path to the directory of current project
 * @argument {bool} isReact whether current project is based on React
 * @argument {bool} isNext whether current project is based on Next JS
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */
module.exports = (projectRoot, isReact, isNext, machinename, description, cb = () => null) => {
  const projectSrc = `${projectRoot}${isNext ? '' : '/src'}`
  // Exceptional behavior for fetching global styles.
  if (machinename === 'style') {
    githubGet('frontcraft/fronthack-components', 'src/style', (err, data, content) => {
      if (err) throw err
      const baseStylesPath = `${projectSrc}/${isReact ? 'style' : 'sass/base'}`
      fs.ensureDir(baseStylesPath, (err) => {
        if (err) throw err
        const saveFiles = new Promise(() => {content.forEach(file => {
          githubGet('frontcraft/fronthack-components', `src/style/${file}`, (err, data, content) => {
            if (err) throw err
            fs.writeFile(`${baseStylesPath}/${file}`, content, (err) => {
              if (err) throw err
              cb(null)
            })
          })
        })})
        saveFiles.then(() => cb(null))
      })
    })
  } else {
    console.log(consoleColors.fronthack, 'Fetching data from a Fronthack components repository...')
    githubGet('frontcraft/fronthack-components', 'src/components', (err, data, content) => {
      if (err) throw err
      if (isReact) {
        // For React version
        if (content.includes(machinename)) {
          const componentPath = `${projectSrc}/components/${machinename}`
          fs.ensureDir(componentPath, (err) => {
            if (err) throw err
            githubGet('frontcraft/fronthack-components', `src/components/${machinename}`, (err, data, content) => {
              if (err) throw err
              const componentFiles = content.filter(file => file!== 'EXAMPLE.js')
              const saveFiles = new Promise(() => { componentFiles.forEach(file => {
                githubGet('frontcraft/fronthack-components', `src/components/${machinename}/${file}`, (err, data, content) => {
                  if (err) throw err
                  const parsedContent = (isNext && file === `${machinename}.js`) ? content.replace("import React from 'react'\n", '') : content
                  fs.writeFile(`${componentPath}/${file}`, parsedContent, (err) => {
                    if (err) throw err
                  })
                })
              })})
              saveFiles.then(() => cb(null))
            })
            console.log(consoleColors.fronthack, 'Found Fronthack component of given name and imported its code.')
          })
        } else {
          console.log(consoleColors.fronthack, `There is no ready Fronthack component of name ${machinename}.`)
          console.log(consoleColors.fronthack, 'Generating a new blank one...')
          generateReactComponent(projectRoot, isNext, 'component', machinename, description)
        }
      } else {
        // For Static HTML version
        const pascalCase = changeCase.pascal(machinename)
        if (content.includes(pascalCase)) {
          githubGet('frontcraft/fronthack-components', `src/components/${pascalCase}/style.sass`, (err, data, content) => {
            if (err) throw err
            const parsedContent = content
              // Remove imports unnecessary for static version
              .replace(/^.*@import.*\n+/gm, '')
              // Exceptional behavior that fixes icon font path.
              .replace('./fonts/waat-icons', '../fonts/waat-icons')
            fs.writeFile(`${projectSrc}/sass/components/_${machinename}.sass`, parsedContent, (err) => {
              if (err) throw err
              // Read static.html and display it on the screen
              githubGet('frontcraft/fronthack-components', `src/components/${pascalCase}/README.md`, (err, data, content) => {
                if (err) throw err
                console.log(consoleColors.fronthack, 'Found Fronthack component of given name and imported its code.')
                const markup = content.match(/(?<=```html\n)[\s\S]*?(?=\n```)+/m)[0]
                console.log(consoleColors.fronthack, '\n------------------------------------------------------------\n')
                console.log(highlight(markup, { language: 'html' }))
                console.log(consoleColors.fronthack, '\n------------------------------------------------------------\n')
                if (err) throw err
                addImportToApp(projectSrc, 'component', machinename, cb)
              })
            })
          })
        } else {
          console.log(consoleColors.fronthack, `There is no ready Fronthack component of name ${machinename}.`)
          console.log(consoleColors.fronthack, 'Generating a new blank one...')
          generateSassComponent(projectSrc, 'component', machinename, description)
        }
      }
    })
  }
}
