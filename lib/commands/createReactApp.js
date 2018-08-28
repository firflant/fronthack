'use strict'

const prompt = require('prompt')
const shell = require('shelljs')
const {consoleColors} = require('../helpers/console-colors')


module.exports = () => {
  const initSchema = {
    properties: {
      name: {
        description: 'Directory of installation',
        type: 'string',
        pattern: /^[a-zA-Z\-\_]+$/,
        message: 'Name must be only letters, dashes or underscores',
        default: 'fronthack'
      }
    }
  }
  prompt.start()
  prompt.get(initSchema, (err, result) => {
    console.log(consoleColors.fronthack, 'Creating React app with Parcel and initial Fronthack utilities...')
    console.log('This command is a wrapper of the "Create React App Parcel" project, which adds a nice Fronthack stuff.')
    console.log('Parcel is a better alternative for Webpack.')
    console.log('Visit https://github.com/sw-yx/create-react-app-parcel')
    console.log('')
    console.log(consoleColors.fronthack, 'Fronhack philosophy is to generate and hack - automate boilerplate, expose everything for developer, leave nothung under the hood.')
    console.log('')
    if (shell.exec(`create-react-app-parcel ${result.name}`).code !== 0) {
      shell.echo('Error: Creating React app failed');
      shell.exit(1);
    }
  })
}