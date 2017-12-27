'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')


module.exports = function() {
  const pageSchema = {
    properties: {
      machinename: {
        description: 'Name of new page (ex. contact, articles, about )',
        type: 'string',
        pattern: /^[a-zA-Z\-]+$/,
        message: 'Name must be only letters or dashes',
        required: true
      }
    }
  }
  prompt.start()
  prompt.get(pageSchema, function (err, result) {
    // Generate content of new file
    const content = `{{> partials/head }}
{{> partials/header }}

Content

<div class="designs designs--${result.machinename}"></div>

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