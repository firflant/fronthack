'use strict'

const prompt = require('prompt')
const generateSassContent = require('../helpers/generate-sass-content')
const saveSass = require('../helpers/save-sass')


module.exports = function() {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of new component',
        type: 'string',
        pattern: /^[a-zA-Z\-]+$/,
        message: 'Name must be only letters or dashes',
        required: true
      },
      description: {
        description: 'It\'s short description',
        type: 'string',
      }
    }
  }
  prompt.start()
  prompt.get(componentSchema, function (err, result) {
    const filename = `_${result.machinename}.sass`
    generateSassContent(result.machinename, result.description, filename, function (err, content, filepath) {
      if (err) throw err
      saveSass(result.machinename, filepath, content, 'component')
    })
  })
}