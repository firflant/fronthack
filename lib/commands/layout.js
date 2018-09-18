'use strict'

const prompt = require('prompt')
const generateReactComponent = require('../helpers/generateReactComponent')
const generateSassComponent = require('../helpers/generateSassComponent')
const regex = require('../helpers/regex')


module.exports = (projectRoot, projectType) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new layout section component',
        type: 'string',
        pattern: projectType === 'react' ? regex.pascalCase : regex.kebabCase,
        message: `Name must be in ${projectType === 'react' ? 'PascalCase' : 'kebab-case'}.`,
        required: true
      },
    }
  }
  prompt.start()
  prompt.get(componentSchema, (err, result) => {
    if (projectType === 'react') {
      generateReactComponent(projectRoot, 'layout', result.machinename)
    } else {
      generateSassComponent(projectRoot, 'layout', result.machinename)
    }
  })
}