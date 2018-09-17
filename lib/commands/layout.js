'use strict'

const prompt = require('prompt')
const generateReactComponent = require('../helpers/generateReactComponent')
const generateSassComponent = require('../helpers/generateSassComponent')


module.exports = (projectRoot, projectType) => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new layout section component',
        type: 'string',
        pattern: projectType === 'react' ? /([A-Z][a-z0-9]+)+$/ : /^[a-zA-Z\-]+$/,
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