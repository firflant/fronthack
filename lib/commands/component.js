'use strict';

var prompt = require('prompt');

var fetchComponent = require('../helpers/fetchComponent');

var regex = require('../helpers/regex');

module.exports = function (projectRoot, isReact, isNext) {
  var componentSchema = {
    properties: {
      machinename: {
        description: 'Machine name of a new component',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: "Name of the ".concat(isReact ? 'react ' : '', "component must be in ").concat(isReact ? 'PascalCase' : 'kebab-case', "."),
        required: true
      },
      description: {
        description: 'It\'s short description',
        type: 'string'
      }
    }
  };
  prompt.start();
  prompt.get(componentSchema, function (err, result) {
    fetchComponent(projectRoot, isReact, isNext, result.machinename, result.description);
  });
};