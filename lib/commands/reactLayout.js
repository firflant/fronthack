'use strict'

const prompt = require('prompt')
const generateReactComponent = require('../helpers/generateReactComponent')


module.exports = (projectRoot) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new layout section component',
        type: 'string',
        pattern: /([A-Z][a-z0-9]+)+$/,
        message: 'Name of the React component must be in PascalCase',
        required: true
      },
    }
  }
  prompt.start()
  prompt.get(componentSchema, (err, result) => {
    generateReactComponent(projectRoot, 'layout', result.machinename)
  })
}