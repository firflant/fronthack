'use strict'

const prompt = require('prompt')
const generateReactComponent = require('../helpers/generateReactComponent')
const generateSassComponent = require('../helpers/generateSassComponent')
const regex = require('../helpers/regex')


module.exports = (projectRoot, isReact, isNext) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new layout section component',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: `Name must be in ${isReact ? 'PascalCase' : 'kebab-case'}.`,
        required: true
      },
    }
  }
  prompt.start()
  prompt.get(componentSchema, (err, result) => {
    if (isReact) {
      generateReactComponent(projectRoot, isNext, 'layout', result.machinename)
    } else {
      generateSassComponent(`${projectRoot}/src`, 'layout', result.machinename)
    }
  })
}