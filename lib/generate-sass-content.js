'use strict'
const fs = require('fs-extra')
const githubGet = require('github-get')
const highlight = require('cli-highlight').highlight
const Sequelize = require('sequelize')

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
      console.log('Creating new Sass file from template for a new component...')
      fs.copy('src/sass/components/!TEMPLATE.sass', filepath, err => {
        if (err) throw err
        fs.readFile(filepath, 'utf8', (err, data) => {
          if (err) throw err
          const content = data.replace('Template', humanname).replace(/template/gi, machinename).replace('!TEMPLATE', machinename).replace('Component description', description)
          return cb(null, content, filepath)
        })
      })
    }
  })
}
