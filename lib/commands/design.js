'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const sizeOf = require('image-size')


module.exports = (projectRoot) => {
  // Load list of avaliable html pages and prepare prompt data.
  fs.readdir(`${projectRoot}/src`, (err, files) => {
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
    fs.readdir(`${projectRoot}/src/designs`, (err, files) => {
      if (err) throw err
      let design = {
        files: files.filter((n) => n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png')),
        description: 'Which design you would like to apply to this page?\n',
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
      prompt.get(designSchema, (err, result) => {
        if (err) throw err
        const selectedHtml = html.files[result.htmlIndex]
        const selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, "")
        const selectedDesign = design.files[result.designIndex]
        // Apply new design as a background CSS property
        const path = `${projectRoot}/src/designs/connect-designs.css`
        fs.ensureFile(path, (err) => {
          if (err) throw err
          fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err
            let dimensions = sizeOf(`${projectRoot}/src/designs/${selectedDesign}`)
            // If width is bigger than 2000px, it means that it is doublesized.
            if (dimensions.width >= 2000) {
              dimensions.width = dimensions.width / 2
            }
            data = `${data}\n  .show-designs .designs--${selectedHtmlName}, .show-code-designs .designs--${selectedHtmlName} { background-image: url('../designs/${selectedDesign}'); width: ${dimensions.width}px; margin: 0 ${dimensions.width / -2}px; }`
            fs.writeFile(path, data, (err) => {
              if (err) throw err
              console.log(`Done! ${selectedDesign} attached to ${selectedHtml} page.`)
            })
          })
        })
      })
    })
  })
}