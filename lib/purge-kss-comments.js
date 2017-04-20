'use strict'
const fs = require('fs-extra')

/**
 * Removes all KSS styleguide comments from the (file) content.
 */
module.exports = function (data, cb) {
  data = data
    .replace(/\/\/\n\/\/ Markup.+\n\/\/\n/, '')
    .replace(/\/\/ default.+\n/, '')
    .replace(/\/\/ ..+ - .+\n/g, '')
    .replace(/\/\/ sg-wrapper\:\n\/\/ \<.+\n/, '')
    .replace(/\/\/ Styleguide.+\n/, '')
    .replace(/\/\/\n\n/, '\n')
  return cb(null, data)
}
