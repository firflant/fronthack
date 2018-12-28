'use strict';

var prompt = require('prompt');

var generateReactComponent = require('../helpers/generateReactComponent');

var generateSassComponent = require('../helpers/generateSassComponent');

var regex = require('../helpers/regex');

module.exports = function (projectRoot, isReact, isNext) {
  var componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new layout section component',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: "Name must be in ".concat(isReact ? 'PascalCase' : 'kebab-case', "."),
        required: true
      }
    }
  };
  prompt.start();
  prompt.get(componentSchema, function (err, result) {
    if (isReact) {
      generateReactComponent(projectRoot, isNext, 'layout', "Layout".concat(result.machinename));
    } else {
      generateSassComponent("".concat(projectRoot, "/src"), 'layout', result.machinename);
    }
  });
};