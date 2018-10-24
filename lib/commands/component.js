'use strict'

const prompt = require('prompt')
const importBitComponent = require('../helpers/importBitComponent')
const getBitComponentData = require('../helpers/getBitComponentData')
const regex = require('../helpers/regex')


module.exports = (projectRoot, isReact) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new component',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: `Name of the ${isReact ? 'react ' : ''}component must be in ${isReact ? 'PascalCase' : 'kebab-case'}.`,
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
    if (isReact) {
      importBitComponent(projectRoot, 'component', result.machinename, result.description)
    } else {
      getBitComponentData(projectRoot, 'component', result.machinename, result.description)
    }
  })
}