'use strict'

const prompt = require('prompt')
const generateReactComponent = require('../helpers/generateReactComponent')
const regex = require('../helpers/regex')


module.exports = (projectRoot, type) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new page',
        type: 'string',
        pattern: regex.PascalCase,
        message: 'Name of the React component must be in PascalCase',
        required: true
      }
    }
  }
  prompt.start()
  prompt.get(componentSchema, (err, result) => {
    generateReactComponent(projectRoot, 'layout', result.machinename)
  })
}