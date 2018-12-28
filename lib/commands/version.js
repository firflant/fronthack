'use strict';

var fs = require('fs');

var getFronthackPath = require('../helpers/getFronthackPath');

var consoleColors = require('../helpers/consoleColors');

module.exports = function () {
  getFronthackPath(function (fronthackPath) {
    fs.readFile("".concat(fronthackPath, "/package.json"), 'utf8', function (err, content) {
      var object = JSON.parse(content);
      console.log(consoleColors.fronthack, "v".concat(object.version));
    });
  });
};