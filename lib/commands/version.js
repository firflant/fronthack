'use strict'

const fs = require('fs')
const { getInstalledPath } = require('get-installed-path')
const consoleColors = require('../helpers/consoleColors')

module.exports = () => {
  getInstalledPath('fronthack').then((path) => {
    fs.readFile(`${path}/package.json`, 'utf8', (err, content) => {
      if (err) throw err
      const object = JSON.parse(content)
      console.log(consoleColors.fronthack, `v${object.version}`)
    })
  })
}