'use strict'

const prompt = require('prompt')
const importBitComponent = require('../helpers/importBitComponent')
const getBitComponentData = require('../helpers/getBitComponentData')


module.exports = (projectRoot, projectType) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new component',
        type: 'string',
        pattern: projectType === 'react' ? /([A-Z][a-z0-9]+)+$/ : /^[a-zA-Z0-9\-]+$/,
        message: `Name of the ${projectType} component must be in ${projectType === 'react' ? 'PascalCase' : 'kebab-case'}.`,
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
    if (projectType === 'react') {
      importBitComponent(projectRoot, 'component', result.machinename, result.description)
    } else {
      getBitComponentData(projectRoot, 'component', result.machinename, result.description)
    }
  })
}