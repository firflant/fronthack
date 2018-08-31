'use strict'
const fs = require('fs-extra')
const glob = require('glob')
const purgeKssComments = require('./purgeKssComments')

/**
 * Checks whether current dir is a React project.
 */
module.exports = function (projectRoot, cb) {
  fs.readFile(`${projectRoot}/package.json`, 'utf8', (err, content) => {
    if (err) throw err
    if (content.includes('\"react\": \"')) return cb(false, true)
    return cb(false, false)
  })
}
