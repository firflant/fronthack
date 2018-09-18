'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const regex = require('../helpers/regex')


module.exports = () => {
  const pageSchema = {
    properties: {
      machinename: {
        description: 'Name of new page (ex. contact, articles, about )',
        type: 'string',
        pattern: regex.kebabCase,
        message: 'Name must be in kebab-case',
        required: true
      }
    }
  }
  prompt.start()
  prompt.get(pageSchema, (err, result) => {
    // Generate content of new file
    // TODO: Replace this string with a template file
    const content = `{{> partials/head }}
{{> partials/header }}

Content

{{> partials/footer }}
{{> partials/scripts }}
`
    const filepath = `${process.cwd()}/src/${result.machinename}.html`
    // Save file
    fs.writeFile(filepath, content, (err) => {
      if (err) throw err
    })
  })
}