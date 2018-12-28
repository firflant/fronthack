'use strict';

var fs = require('fs-extra');

var prompt = require('prompt');

var getFronthackPath = require('../helpers/getFronthackPath');

var regex = require('../helpers/regex');

var generateReactComponent = require('../helpers/generateReactComponent');

module.exports = function (projectRoot, isReact, isNext) {
  var pageSchema = {
    properties: {
      machinename: {
        description: 'Name of new page (ex. contact, articles, about )',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: "Name must be in ".concat(isReact ? 'PascalCase' : 'kebab-case', "."),
        required: true
      }
    }
  };
  prompt.start();
  prompt.get(pageSchema, function (err, result) {
    if (isReact) {
      if (!isNext) {
        generateReactComponent(projectRoot, isNext, 'page', result.machinename);
      } else {
        console.log('Nothing happened! In NextJS please add new pages that manually, by creating a file in "/pages" directory.');
      }
    } else {
      getFronthackPath(function (fronthackPath) {
        fs.readFile("".concat(fronthackPath, "/templates/page.html"), 'utf8', function (err, content) {
          if (err) throw err;
          fs.writeFile("".concat(projectRoot, "/src/").concat(result.machinename, ".html"), content, function (err) {
            if (err) throw err;
          });
        });
      });
    }
  });
};