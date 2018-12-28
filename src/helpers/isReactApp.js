'use strict'
const fs = require('fs-extra')

/**
 * Checks whether current dir is a React project.
 * @argument {string} projectRoot root path of the current project
 * @argument {function} cb callback to perform after success 
 */
module.exports = function (projectRoot, cb) {
  fs.readFile(`${projectRoot}/package.json`, 'utf8', (err, content) => {
    if (err) throw err
    if (content.includes('\"react\": \"')) return cb(false, true)
    return cb(false, false)
  })
}
