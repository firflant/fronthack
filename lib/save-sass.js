'use strict'
const fs = require('fs-extra')


/**
 * Adds new import to app.sass file
 */
module.exports = function (machinename, filepath, content, type) {
  fs.writeFile(filepath, content, (err) => {
    if (err) throw err
    console.log(`New file created at ${filepath}`)
    fs.readFile('src/sass/app.sass', 'utf8', (err, data) => {
      if (err) throw err
      const newData = data.replace(`New ${type}s`, `New ${type}s\n@import "components/${machinename}"`)
      fs.writeFile('src/sass/app.sass', newData, (err) => {
        if (err) throw err
        console.log('Import added to app.sass')
      })
    })
  })
}
