'use strict'

const prompt = require('prompt')
const saveSass = require('../helpers/saveSass')


module.exports = () => {
  const componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new component',
        type: 'string',
        pattern: /^[a-zA-Z\-]+$/,
        message: 'Name must be only letters or dashes', // TODO: should be camelCase
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
    prompt.get(`Create react component named ${result.machinename}`);
  })
}