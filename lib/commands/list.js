'use strict'

const openUrl = require('openurl')
const consoleColors = require('../helpers/consoleColors')

module.exports = () => {
  const url = 'https://bitsrc.io/frontcraft/fronthack'
  console.log('')
  console.log(consoleColors.fronthack, 'Browse a library of ready Fronthack components here:')
  console.log(consoleColors.fronthack, url)
  console.log('')
  openUrl.open(url)
}