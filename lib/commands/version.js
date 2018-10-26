'use strict'

const fs = require('fs')
const getFronthackPath = require('../helpers/getFronthackPath')
const consoleColors = require('../helpers/consoleColors')

module.exports = () => {
  getFronthackPath(path => {
    fs.readFile(`${path}/package.json`, 'utf8', (err, content) => {
      const object = JSON.parse(content)
      console.log(consoleColors.fronthack, `v${object.version}`)
    })
  })
}