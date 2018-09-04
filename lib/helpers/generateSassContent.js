'use strict'
const fs = require('fs-extra')
const githubGet = require('github-get')
// const highlight = require('cli-highlight').highlight

const consoleColors = require('./consoleColors')
const fetchSassTemplate = require('./fetchSassTemplate')
const purgeKssComments = require('./purgeKssComments')

/**
 * Checks if component of given name exists in Fronthack repository and returns
 * it's Sass
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {string} filename name of the file
 * @argument {function} cb callback to perform after success 
 */
module.exports = (machinename, description, filename, cb) => {
  const humanname = machinename.charAt(0).toUpperCase() + machinename.slice(1).replace('-', ' ')
  const filepath = `src/sass/components/${filename}`
  const currentepath = process.cwd()
  if (fs.existsSync(`${currentepath}/${filepath}`)) {
    throw new Error (`Error: ${machinename} component already exists. Choose another name.`)
  }
  githubGet('frontcraft/fronthack-repo', 'src/sass/components', (err, data, content) => {
    if (err) throw err
    if (content.includes(filename)) {
      console.log(consoleColors.fronthack, `Component named "${machinename}" found in Fronthack repository. Fetching it's data into local Sass file...`)
      githubGet('frontcraft/fronthack-repo', `src/sass/components/html/${machinename}.html`, (err, data, content) => {
        if (err) throw err
        // content = highlight(content, {language: 'html', ignoreIllegals: true})
        console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
        console.log(consoleColors.fronthack, `New "${machinename}" component has folowing HTML markup:\n`)
        console.log(consoleColors.green, content)
        console.log(consoleColors.fronthack, '--------------------------------------------------\n')
        githubGet('frontcraft/fronthack-repo', filepath, (err, data, content) => {
          if (err) throw err
          purgeKssComments(content, (err, content) => {
            if (err) throw err
            return cb(null, content, filepath)
          })
        })
      })
    } else {
      fetchSassTemplate(filepath, machinename, humanname, 'component', description, (err, content, filepath) => {
        if (err) throw err
        return cb(null, content, filepath)
      })
    }
  })
}
