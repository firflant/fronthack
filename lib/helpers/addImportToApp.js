'use strict';

var fs = require('fs-extra');
/**
 * Adds new import to app.sass file
 * @argument {string} projectSrc path to the src directory of current project
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 */


module.exports = function (projectSrc, type, machinename) {
  var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
    return null;
  };
  fs.readFile("".concat(projectSrc, "/sass/app.sass"), 'utf8', function (err, data) {
    if (err) throw err;
    var newData = data.replace("New ".concat(type, "s"), "New ".concat(type, "s\n@import \"").concat(type, "s/").concat(machinename, "\""));
    fs.writeFile("".concat(projectSrc, "/sass/app.sass"), newData, function (err) {
      if (err) throw err;
      console.log('Import added to app.sass');
      cb();
    });
  });
};