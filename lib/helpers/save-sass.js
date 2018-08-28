'use strict'
const fs = require('fs-extra')

const {consoleColors} = require('./console-colors')


/**
 * Adds new import to app.sass file
 */
module.exports = (machinename, filepath, content, type) => {
  let importPath = `components/${machinename}`
  if (type == 'layout') {
    importPath = `layout/layout-${machinename}`
    console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
    console.log(consoleColors.fronthack, `New layout element has folowing HTML markup:\n`)
    console.log(consoleColors.green, `<div class="layout-${machinename}">\n</div>`)
    console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
  }
  fs.writeFile(filepath, content, (err) => {
    if (err) throw err
    console.log(`New file created at ${filepath}`)
    fs.readFile('src/sass/app.sass', 'utf8', (err, data) => {
      if (err) throw err
      const newData = data.replace(`New ${type}s`, `New ${type}s\n@import "${importPath}"`)
      fs.writeFile('src/sass/app.sass', newData, (err) => {
        if (err) throw err
        console.log('Import added to app.sass')
        console.log(consoleColors.fronthack, 'Done!')
      })
    })
  })
}
