'use strict';

var fs = require('fs-extra');

var prompt = require('prompt');

var sizeOf = require('image-size');

module.exports = function (projectRoot) {
  // Load list of avaliable html pages and prepare prompt data.
  fs.readdir("".concat(projectRoot, "/src"), function (err, files) {
    if (err) throw err;
    var html = {
      files: files.filter(function (n) {
        return n.includes('.html');
      }),
      description: 'For which page you would like attach design to?\n',
      patternArray: []
    };
    html.files.map(function (file, i) {
      html.description = "".concat(html.description).concat(i, ": ").concat(file, "\n");
      html.patternArray.push(i);
    });
    html.pattern = new RegExp(html.patternArray.join('|'));
    html.description = "".concat(html.description, "Select number from the list above"); // Load list of avaliable design files

    fs.readdir("".concat(projectRoot, "/src/designs"), function (err, files) {
      if (err) throw err;
      var design = {
        files: files.filter(function (n) {
          return n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png');
        }),
        description: 'Which design you would like to apply to this page?\n',
        patternArray: []
      };
      design.files.map(function (file, i) {
        design.description = "".concat(design.description).concat(i, ": ").concat(file, "\n");
        design.patternArray.push(i);
      });
      design.pattern = new RegExp(design.patternArray.join('|'));
      design.description = "".concat(design.description, "Select number from the list above");
      var designSchema = {
        properties: {
          htmlIndex: {
            description: html.description,
            type: 'string',
            pattern: html.pattern,
            message: 'It must be a number from the list',
            required: true
          },
          designIndex: {
            description: design.description,
            type: 'string',
            pattern: design.pattern,
            message: 'It must be a number from the list',
            required: true
          }
        }
      };
      prompt.start();
      prompt.get(designSchema, function (err, result) {
        if (err) throw err;
        var selectedHtml = html.files[result.htmlIndex];
        var selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, "");
        var selectedDesign = design.files[result.designIndex]; // Apply new design as a background CSS property

        var path = "".concat(projectRoot, "/src/designs/connect-designs.css");
        fs.ensureFile(path, function (err) {
          if (err) throw err;
          fs.readFile(path, 'utf8', function (err, data) {
            if (err) throw err;
            var dimensions = sizeOf("".concat(projectRoot, "/src/designs/").concat(selectedDesign)); // If width is bigger than 2000px, it means that it is doublesized.

            if (dimensions.width >= 2000) {
              dimensions.width = dimensions.width / 2;
            }

            data = "".concat(data, "\n  .show-designs .designs--").concat(selectedHtmlName, ", .show-code-designs .designs--").concat(selectedHtmlName, " { background-image: url('../designs/").concat(selectedDesign, "'); width: ").concat(dimensions.width, "px; margin: 0 ").concat(dimensions.width / -2, "px; }");
            fs.writeFile(path, data, function (err) {
              if (err) throw err;
              console.log("Done! ".concat(selectedDesign, " attached to ").concat(selectedHtml, " page."));
            });
          });
        });
      });
    });
  });
};