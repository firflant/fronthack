'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')

const fetchSassTemplate = require('../helpers/fetchSassTemplate')
const saveSass = require('../helpers/saveSass')


module.exports = () => {
  const layoutSchema = {
    properties: {
      machinename: {
        description: 'Name of new section (ex. footer)',
        type: 'string',
        pattern: /^[a-zA-Z\-]+$/,
        message: 'Name must be only letters or dashes',
        required: true
      }
    }
  }
  prompt.start()
  prompt.get(layoutSchema, (err, result) => {
    const filename = `_layout-${result.machinename}.sass`
    const humanname = result.machinename.charAt(0).toUpperCase() + result.machinename.slice(1).replace('-', ' ')
    const filepath = `src/sass/layout/${filename}`
    const currentepath = process.cwd()
    if (fs.existsSync(`${currentepath}/${filepath}`)) {
      throw new Error (`Error: ${result.machinename} layout section already exists. Choose another name.`)
    }
    fetchSassTemplate(filepath, result.machinename, humanname, 'layout', null, (err, content, filepath) => {
      if (err) throw err
      saveSass(result.machinename, filepath, content, 'layout')
    })
  })
}