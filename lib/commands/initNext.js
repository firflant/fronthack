'use strict';

var fs = require('fs-extra');

var prompt = require('prompt');

var shell = require('shelljs');

var copy = require('recursive-copy');

var getFronthackPath = require('../helpers/getFronthackPath');

var consoleColors = require('../helpers/consoleColors');

var fetchComponent = require('../helpers/fetchComponent');

var regex = require('../helpers/regex');

module.exports = function () {
  var initSchema = {
    properties: {
      name: {
        description: 'Directory of installation',
        type: 'string',
        pattern: regex.projectName,
        message: 'Name must be only letters, numbers dashes or underscores',
        default: 'fronthack-next'
      }
    }
  };
  prompt.start();
  prompt.get(initSchema, function (err, result) {
    if (result.name === 'fronthack') {
      throw new Error('Name should be different than fronthack');
    }

    console.log(consoleColors.fronthack, 'Initiating Fronthack directory for new project...');
    var projectRoot = "".concat(process.cwd(), "/").concat(result.name); // Copy static-repo file tree template

    getFronthackPath(function (fronthackPath) {
      copy("".concat(fronthackPath, "/templates/next-repo"), projectRoot, function (err) {
        shell.cd(result.name);
        if (err) throw err; // Prepare designs directory.

        fs.ensureDir("".concat(projectRoot, "/designs"), function (err) {
          if (err) throw err;
          fs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8', function (err, content) {
            if (err) throw err;
            fs.writeFile("".concat(projectRoot, "/designs/README.md"), content, function (err) {
              if (err) throw err; // .gitignore_template is not named just .gitignore because when
              // Fronthack is installed globally with yarn, yarn not

              fs.rename("".concat(projectRoot, "/.gitignore_template"), "".concat(projectRoot, "/.gitignore"), function (err) {
                if (err) throw err;
                shell.cd(projectRoot);
                console.log(consoleColors.fronthack, 'Installing node dependencies...'); // Install dependencies

                shell.exec('yarn install && yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard', {
                  async: true,
                  silent: false
                }, function (code) {
                  if (code != 0) throw new Error('Installing dependencies failed');
                  fs.readFile("".concat(fronthackPath, "/templates/fronthack-scripts-import.js"), 'utf8', function (err, scriptsImportTemplate) {
                    if (err) throw err;
                    fs.readFile("".concat(projectRoot, "/pages/_app.js"), 'utf8', function (err, content) {
                      if (err) throw err;
                      var newContent = content.replace('  render () {', "  componentDidMount() {".concat(scriptsImportTemplate, "\n  }\n\n  render () {"));
                      fs.writeFile("".concat(projectRoot, "/pages/_app.js"), newContent, function (err) {
                        if (err) throw err; // Add eslint config.

                        fs.readFile("".concat(fronthackPath, "/templates/.eslintrc"), 'utf8', function (err, content) {
                          if (err) throw err;
                          fs.writeFile("".concat(projectRoot, "/.eslintrc"), content, function (err) {
                            if (err) throw err;
                            fetchComponent(projectRoot, true, true, 'style', null, function (err) {
                              if (err) throw err; // Do initial git commit.

                              shell.exec('git init', {
                                async: true
                              }, function (code) {
                                // if (code != 0) throw new Error('Error: Could not initiate git');
                                shell.exec('git add .', {
                                  async: true,
                                  silent: true
                                }, function (code) {
                                  // if (code != 0) throw new Error('Error: Could not use git');
                                  shell.exec('git commit -m "Repository initiated by fronthack"', {
                                    async: true,
                                    silent: true
                                  }, function (code) {
                                    // if (code != 0) throw new Error('Error: Could not use git');
                                    console.log(consoleColors.fronthack, 'Opinionated Fronthack Next project is ready for hacking! Begin by typing:');
                                    console.log('');
                                    console.log(consoleColors.fronthack, "  cd ".concat(result.name));
                                    console.log(consoleColors.fronthack, '  yarn dev');
                                    console.log('');
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};