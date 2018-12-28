'use strict';

var fs = require('fs-extra');

var changeCase = require('case');

var highlight = require('cli-highlight').highlight;

var getFronthackPath = require('../helpers/getFronthackPath');

var consoleColors = require('./consoleColors');

var addImportToApp = require('./addImportToApp');
/**
 * Generate blank Sass component from template.
 * @argument {string} projectSrc path to the src directory of current project
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */


module.exports = function (projectSrc, type, machinename) {
  var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {
    return null;
  };
  getFronthackPath(function (fronthackPath) {
    // Fetch sass template
    fs.readFile("".concat(fronthackPath, "/templates/sass-component.sass"), 'utf8', function (err, sassContent) {
      var humanCase = changeCase.sentence(machinename);
      var checkedMachinename = type === 'layout' ? "layout-".concat(machinename) : machinename;
      var parsedSassContent = sassContent.replace('Name', humanCase).replace(/name/g, checkedMachinename);
      if (description) parsedSassContent = parsedSassContent.replace('Description', description);
      fs.writeFile("".concat(projectSrc, "/sass/").concat(type, "s/_").concat(checkedMachinename, ".sass"), parsedSassContent, function (err) {
        if (err) throw err;
        addImportToApp(projectSrc, type, checkedMachinename, function () {
          console.log(consoleColors.fronthack, '\n--------------------------------------------------\n');
          console.log(consoleColors.fronthack, "New element can have folowing initial HTML markup:\n");
          console.log(highlight("<div class=\"".concat(checkedMachinename, "\"></div>"), {
            language: 'html'
          }));
          console.log(consoleColors.fronthack, '\n--------------------------------------------------\n');
        });
      });
    });
  });
};