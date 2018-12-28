'use strict';

var fs = require('fs-extra');

var prompt = require('prompt');

var sizeOf = require('image-size');

var regex = require('../helpers/regex');

module.exports = function (projectRoot) {
  // Load list of avaliable design files
  fs.readdir("".concat(projectRoot, "/designs"), function (err, files) {
    if (err) throw err;
    var design = {
      files: files.filter(function (n) {
        return n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png') || n.endsWith('.svg');
      }),
      description: 'Which design you would like to pair with a page?\n',
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
        designIndex: {
          description: design.description,
          type: 'string',
          pattern: design.pattern,
          message: 'It must be a number from the list',
          required: true
        },
        url: {
          description: 'Enter the url of the page you want to pair (example: "company/about-us"). Enter "index" for the base url path.\n',
          type: 'string',
          pattern: regex.pageUrl,
          message: 'It must contain only alphanumeric characters, dashes, underscores or slashes.',
          required: true
        }
      }
    };
    prompt.start();
    prompt.get(designSchema, function (err, result) {
      if (err) throw err;
      var selectedHtml = result.url;
      var selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, '').replace(/[\/\\]+$/, '-');
      var selectedDesign = design.files[result.designIndex]; // Apply new design as a background CSS property

      var devCss = "".concat(projectRoot, "/designs/connect-designs.css");
      fs.ensureFile(devCss, function (err) {
        if (err) throw err;
        fs.readFile(devCss, 'utf8', function (err, data) {
          if (err) throw err;
          var dimensions = sizeOf("".concat(projectRoot, "/designs/").concat(selectedDesign)); // If width is bigger than 2000px, it means that it is doublesized.

          if (dimensions.width >= 2000) {
            dimensions.width = dimensions.width / 2;
          }

          data = "".concat(data, "\n  .show-designs .designs--").concat(selectedHtmlName, ", .show-code-designs .designs--").concat(selectedHtmlName, " { background-image: url('../designs/").concat(selectedDesign, "'); width: ").concat(dimensions.width, "px; margin: 0 ").concat(dimensions.width / -2, "px; }");
          fs.writeFile(devCss, data, function (err) {
            if (err) throw err;
            console.log("Done! ".concat(selectedDesign, " attached to ").concat(selectedHtml, " page."));
          });
        });
      });
    });
  });
};