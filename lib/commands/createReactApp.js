'use strict'

const prompt = require('prompt')
const shell = require('shelljs')
const fs = require('fs-extra')
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
    shell.exec(`create-react-app-parcel ${result.name}`, {async: true}, (code) => {
      if (code != 0) throw new Error('Error: Creating React app failed');
      shell.cd(result.name)
      shell.exec('bit init', {async: true}, (code) => {
        if (code != 0) throw new Error('Error: Could not initiate Bit');
        fs.readFile(`${process.cwd()}/bit.json`, 'utf8', (err, content) => {
          if (err) throw err
          const newContent = content.replace('\"componentsDefaultDirectory\": \"components', '\"componentsDefaultDirectory\": \"src')
          fs.writeFile(`${process.cwd()}/bit.json`, newContent, (err) => {
            if (err) throw err
            shell.exec('bit import fronthack.fronthack/globals/_variables --skip-npm-install --ignore-package-json --ignore-dist', {async: true}, (code) => {
              if (code != 0) throw new Error('Error: Could not add a nice Fronthack stuff');
            })
          })
        })
      })
    })
  })
}