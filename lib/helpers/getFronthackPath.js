'use strict'

const fs = require('fs')
const yarnModules = require('yarn-global-modules');
const globalModules = require('global-modules');

module.exports = (cb = () => null) => {
  const yarnPath = `${yarnModules()}/node_modules/fronthack`
  fs.readdir(yarnPath, 'utf8', (err) => {
    if (err) {
      const npmPath = `${globalModules}/fronthack`
      fs.readdir(npmPath, 'utf8', (err) => {
        if (err) throw err
        cb(npmPath)
      })
    } else {
      cb(yarnPath)
    }
  })
}