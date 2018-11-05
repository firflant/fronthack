'use strict'

const prompt = require('prompt')
const fetchComponent = require('../helpers/fetchComponent')
const fetchComponentData = require('../helpers/fetchComponentData')
const regex = require('../helpers/regex')


module.exports = (projectRoot, isReact, isNext) => {
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
      fetchComponent(`${projectRoot}${isNext ? '' : '/src'}`, 'component', result.machinename, result.description)
    } else {
      fetchComponentData(projectRoot, result.machinename, result.description)
    }
  })
}