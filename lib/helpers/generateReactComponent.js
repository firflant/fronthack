'use strict';

var fs = require('fs-extra');

var changeCase = require('case');

var getFronthackPath = require('../helpers/getFronthackPath');

var consoleColors = require('./consoleColors');
/**
 * Generate blank React component from template.
 * @argument {string} projectRoot path to the directory of current project
 * @argument {bool} isNext whether current project is based on Next JS
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 * @argument {function} cb callback to perform after success
 */


module.exports = function (projectRoot, isNext, type, machinename) {
  var description = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var cb = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {
    return null;
  };
  var projectSrc = "".concat(projectRoot).concat(isNext ? '' : '/src');
  getFronthackPath(function (fronthackPath) {
    var reactComponentTemplatePath;

    switch (type) {
      case 'page':
        reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-page.js");
        break;

      case 'layout':
        reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-component-functional.js");
        break;

      default:
        reactComponentTemplatePath = isNext ? "".concat(fronthackPath, "/templates/react-component-functional.js") : "".concat(fronthackPath, "/templates/react-component-class.js");
        break;
    }

    if (type === 'page') {
      fs.ensureDir("".concat(projectSrc, "/").concat(type, "s"), function (err) {
        if (err) throw err;
        fs.readFile(reactComponentTemplatePath, 'utf8', function (err, reactScreen) {
          var parsedReactScreen = reactScreen.replace(/PageName/g, machinename);
          if (isNext) parsedReactScreen = parsedReactScreen.replace("import React from 'react'\n", '');
          fs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, ".js"), parsedReactScreen, function (err) {
            if (err) throw err;
            console.log(consoleColors.fronthack, 'Done!');
          });
        });
      });
    } else {
      fs.ensureDir("".concat(projectSrc, "/").concat(type, "s/").concat(machinename), function (err) {
        if (err) throw err; // Fetch React component template

        fs.readFile(reactComponentTemplatePath, 'utf8', function (err, reactComponent) {
          if (err) throw err;
          var kebabCase = changeCase.kebab(machinename);
          var humanCase = changeCase.sentence(machinename);
          var parsedReactComponent = reactComponent.replace(/ComponentName/g, machinename).replace('component-name', kebabCase);
          if (isNext) parsedReactComponent = parsedReactComponent.replace("import React from 'react'\n", '');
          if (description) parsedReactComponent = parsedReactComponent.replace('Description', description);
          fs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/").concat(machinename, ".js"), parsedReactComponent, function (err) {
            if (err) throw err; // Fetch sass template

            fs.readFile("".concat(fronthackPath, "/templates/sass-component.sass"), 'utf8', function (err, sassContent) {
              var parsedSassContent = sassContent.replace('// Name', "@import '../../style/variables'\n@import '../../style/mixins'\n\n// Name").replace('Name', humanCase).replace(/name/g, kebabCase);
              if (description) parsedSassContent = parsedSassContent.replace('Description', description);
              fs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/style.sass"), parsedSassContent, function (err) {
                if (err) throw err; // Fetch index file template

                fs.readFile("".concat(fronthackPath, "/templates/react-component-index.js"), 'utf8', function (err, indexFile) {
                  if (err) throw err;
                  var parsedIndexFile = indexFile.replace('ComponentName', machinename);
                  fs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/index.js"), parsedIndexFile, function (err) {
                    if (err) throw err;
                    console.log(consoleColors.fronthack, 'Done!');
                  });
                });
              });
            });
          });
        });
      });
    }
  });
};