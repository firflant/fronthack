'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const sizeOf = require('image-size')
const regex = require('../helpers/regex')


module.exports = (projectRoot) => {
  // Load list of avaliable design files
  fs.readdir(`${projectRoot}/designs`, (err, files) => {
    if (err) throw err
    let design = {
      files: files.filter((n) => n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png') || n.endsWith('.svg')),
      description: 'Which design you would like to pair with a page?\n',
      patternArray: [],
    }
    design.files.map((file, i) => {
      design.description = `${design.description}${i}: ${file}\n`
      design.patternArray.push(i)
    })
    design.pattern = new RegExp(design.patternArray.join('|'))
    design.description = `${design.description}Select number from the list above`
    const designSchema = {
      properties: {
        designIndex: {
          description: design.description,
          type: 'string',
          pattern: design.pattern,
          message: 'It must be a number from the list',
          required: true
        },
        url: {
          description: 'Enter the url of the page you want to pair (example: "company/about-us"). Enter "index" for the base url path.\n',
          type: 'string',
          pattern: regex.pageUrl,
          message: 'It must contain only alphanumeric characters, dashes, underscores or slashes.',
          required: true
        }
      }
    }
    prompt.start()
    prompt.get(designSchema, (err, result) => {
      if (err) throw err
      const selectedHtml = result.url
      const selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, '').replace(/[\/\\]+$/, '-')
      const selectedDesign = design.files[result.designIndex]
      // Apply new design as a background CSS property
      const devCss = `${projectRoot}/designs/connect-designs.css`
      fs.ensureFile(devCss, (err) => {
        if (err) throw err
        fs.readFile(devCss, 'utf8', (err, data) => {
          if (err) throw err
          let dimensions = sizeOf(`${projectRoot}/designs/${selectedDesign}`)
            // If width is bigger than 2000px, it means that it is doublesized.
            if (dimensions.width >= 2000) {
              dimensions.width = dimensions.width / 2
            }
            data = `${data}\n  .show-designs .designs--${selectedHtmlName}, .show-code-designs .designs--${selectedHtmlName} { background-image: url('../designs/${selectedDesign}'); width: ${dimensions.width}px; margin: 0 ${dimensions.width / -2}px; }`
          fs.writeFile(devCss, data, (err) => {
            if (err) throw err
            console.log(`Done! ${selectedDesign} attached to ${selectedHtml} page.`)
          })
        })
      })
    })
  })
}