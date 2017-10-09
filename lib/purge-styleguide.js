'use strict'
const fs = require('fs-extra')
const glob = require('glob')
const purgeKssComments = require('./purge-kss-comments')

/**
 * Removes all styleguide stuff from the project.
 */
module.exports = function (fronthackPath, cb) {
  const files = [
    'styleguide',
    'src/sass/styleguide-overrides.sass',
    'src/sass/base/html',
    'src/sass/components/html',
  ]
  // Remove Styleguide files.
  files.forEach(function (file) {
    fs.remove(`${fronthackPath}/${file}`, function (err) {
      if (err) throw err
    })
  })
  // Remove unneccessary stuff from Sass files.
  glob(`${fronthackPath}/src/sass/*/*.sass`, function (err, files) {
    if (err) throw err
    files.push(`${fronthackPath}/src/sass/app.sass`)
    files.forEach(function (file) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err
        purgeKssComments(data, (err, data) => {
          if (err) throw err
          fs.writeFile(file, data, (err) => {
            if (err) throw err
          })
        })
      })
    })
    // Remove styleguide dependenciy from package.json
    fs.readFile(`${fronthackPath}/package.json`, 'utf8', (err, data) => {
      if (err) throw err
      data = data.replace(/,\n.+sc5-styleguide.+/, '')
      fs.writeFile(`${fronthackPath}/package.json`, data, (err) => {
        if (err) throw err
        // Remove styleguide generation tasks from Gulp.
        fs.readFile(`${fronthackPath}/gulpfile.js`, 'utf8', (err, data) => {
          if (err) throw err
          data = data
            .replace(/.+require.+sc5-styleguide.+\n/, '')
            .replace(/,\n  styleguide: {(\n.*)*,\n  }/, '')
            .replace(/\/\/ Styleguide start+(\n.*)*\/\/ Styleguide end/, '')
          fs.writeFile(`${fronthackPath}/gulpfile.js`, data, (err) => {
            if (err) throw err
            return cb(null)
          })
        })
      })
    })
  })
}
