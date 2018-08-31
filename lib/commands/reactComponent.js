'use strict'

const prompt = require('prompt')
const importBitComponent = require('../helpers/importBitComponent')


module.exports = (projectRoot) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new component',
        type: 'string',
        pattern: /([A-Z][a-z0-9]+)+$/,
        message: 'Name of the React component must be PascalCase',
        required: true
      },
      description: {
        description: 'It\'s short description',
        type: 'string',
      }
    }
  }
  prompt.start()
  prompt.get(componentSchema, (err, result) => {
    importBitComponent(projectRoot, 'component', result.machinename, result.description)
  })
}