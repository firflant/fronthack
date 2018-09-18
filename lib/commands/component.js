'use strict'

const prompt = require('prompt')
const importBitComponent = require('../helpers/importBitComponent')
const getBitComponentData = require('../helpers/getBitComponentData')
const regex = require('../helpers/regex')


module.exports = (projectRoot, projectType) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new component',
        type: 'string',
        pattern: projectType === 'react' ? regex.pascalCase : regex.kebabCase,
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