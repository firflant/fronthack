'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const { getInstalledPath } = require('get-installed-path')
const regex = require('../helpers/regex')
const generateReactComponent = require('../helpers/generateReactComponent')


module.exports = (projectRoot, isReact) => {
  const pageSchema = {
    properties: {
      machinename: {
        description: 'Name of new page (ex. contact, articles, about )',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: `Name must be in ${isReact ? 'PascalCase' : 'kebab-case'}.`,
        required: true
      }
    }
  }
  prompt.start()
  prompt.get(pageSchema, (err, result) => {
    if (isReact) {
      generateReactComponent(projectRoot, 'screen', result.machinename)
    } else {
      getInstalledPath('fronthack').then((path) => {
        fs.readFile(`${path}/lib/templates/page.html`, 'utf8', (err, content) => {
          if (err) throw err
          fs.writeFile(`${projectRoot}/src/${result.machinename}.html`, content, (err) => {
            if (err) throw err
          })
        })
      })
    }
  })
}