'use strict'

const fs = require('fs')
const getFronthackPath = require('../helpers/getFronthackPath')
const consoleColors = require('../helpers/consoleColors')

module.exports = () => {
  getFronthackPath(fronthackPath => {
    fs.readFile(`${fronthackPath}/package.json`, 'utf8', (err, content) => {
      const object = JSON.parse(content)
      console.log(consoleColors.fronthack, `v${object.version}`)
    })
  })
}