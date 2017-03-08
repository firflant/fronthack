'use strict'
const fs = require('fs-extra')
const githubGet = require('github-get')
const highlight = require('cli-highlight').highlight
const Sequelize = require('sequelize')
const fetchSassTemplate = require('./fetch-sass-template')

/**
 * Checks if component of given name exists in Fronthack repository and returns
 * it's Sass
 */
module.exports = function (machinename, description, filename, cb) {
  const humanname = machinename.charAt(0).toUpperCase() + machinename.slice(1).replace('-', ' ')
  const filepath = `src/sass/components/${filename}`
  const currentepath = process.cwd()
  if (fs.existsSync(`${currentepath}/${filepath}`)) {
    throw new Error (`Error: ${machinename} component already exists. Choose another name.`)
  }
  githubGet('frontcraft/fronthack', 'src/sass/components', function (err, data, content) {
    if (err) throw err
    if (content.includes(filename)) {
      console.log(`Component named "${machinename}" found in Fronthack repository. Fetching it's data into local Sass file...`)
      githubGet('frontcraft/fronthack', `src/sass/components/html/${machinename}.html`, function (err, data, content) {
        if (err) throw err
        const highlighted = highlight(content, {ignoreIllegals: true})
        console.log('\n--------------------------------------------------\n')
        console.log(`The "${machinename}" component has folowing HTML markup:\n`)
        console.log(highlighted)
        console.log('--------------------------------------------------\n')
        githubGet('frontcraft/fronthack', filepath, function (err, data, content) {
          if (err) throw err
          return cb(null, content, filepath)
        })
      })
    } else {
      fetchSassTemplate(filepath, machinename, humanname, 'component', description, function (err, content, filepath) {
        if (err) throw err
        return cb(null, content, filepath)
      })
    }
  })
}
