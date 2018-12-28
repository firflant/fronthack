'use strict';

var openUrl = require('openurl');

var consoleColors = require('../helpers/consoleColors');

module.exports = function () {
  var url = 'https://frontcraft.github.io/fronthack-components';
  console.log('');
  console.log(consoleColors.fronthack, 'Browse a library of ready Fronthack components here:');
  console.log(consoleColors.fronthack, url);
  console.log('');
  openUrl.open(url);
};