'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')


module.exports = function() {
  // Load list of avaliable html pages and prepare prompt data.
  fs.readdir(`${process.cwd()}/src`, function (err, files) {
    if (err) throw err
    let html = {
      files: files.filter((n) => n.includes('.html')),
      description: 'For which page you would like attach design to?\n',
      patternArray: [],
    }
    html.files.map((file, i) => {
      html.description = `${html.description}${i}: ${file}\n`
      html.patternArray.push(i)
    })
    html.pattern = new RegExp(html.patternArray.join('|'))
    html.description = `${html.description}Select number from the list above`
    // Load list of avaliable design files
    fs.readdir(`${process.cwd()}/src/designs`, function (err, files) {
      if (err) throw err
      let design = {
        files: files.filter((n) => n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png')),
        description: 'Which design you would like to apply to this page?\n',
        patternArray: [],
        widths: []
      }
      design.files.map((file, i) => {
        design.description = `${design.description}${i}: ${file}\n`
        const dimensions = sizeOf(`${process.cwd()}/src/designs/${file}`)
        design.patternArray.push(i)
        design.widths.push(dimensions.width)
      })
      // Throw error if any of the images has another width.
      design.widths.map((dimension, i) => {
        if (i !== 0 && design.widths[i] !== design.widths[i-1]) {
          throw new Error(`Error! All design files should have the same width. ${design.files[i]} is different.`)
        }
      })
      design.pattern = new RegExp(design.patternArray.join('|'))
      design.description = `${design.description}Select number from the list above`
      const designSchema = {
        properties: {
          htmlIndex: {
            description: html.description,
            type: 'string',
            pattern: html.pattern,
            message: 'It must be a number from the list',
            required: true
          },
          designIndex: {
            description: design.description,
            type: 'string',
            pattern: design.pattern,
            message: 'It must be a number from the list',
            required: true
          }
        }
      }
      prompt.start()
      prompt.get(designSchema, function (err, result) {
        if (err) throw err
        const selectedHtml = html.files[result.htmlIndex]
        const selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, "")
        const selectedDesign = design.files[result.designIndex]
        // Apply new design as a background CSS property
        const devCss = `${process.cwd()}/src/dev-scripts/dev.css`
        fs.readFile(devCss, 'utf8', (err, data) => {
          if (err) throw err
          // If all designs has the same width, we can apply there value from the any item.
          data = data.replace(/  --designs-width.+/, `  --designs-width: ${design.widths[0]}px;`)
          data = `${data}\n  .show-designs .designs--${selectedHtmlName}, .show-code-designs .designs--${selectedHtmlName} { background-image: url('../designs/${selectedDesign}'); }`
          fs.writeFile(devCss, data, (err) => {
            if (err) throw err
            console.log(`Done! ${selectedDesign} attached to ${selectedHtml} page.`)
          })
        })
      })
    })
  })
}