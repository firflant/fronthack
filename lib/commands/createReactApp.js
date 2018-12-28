'use strict';

var prompt = require('prompt');

var shell = require('shelljs');

var fs = require('fs-extra');

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
        default: 'fronthack-react'
      }
    }
  };
  prompt.start();
  prompt.get(initSchema, function (err, result) {
    console.log(consoleColors.fronthack, 'Creating React app with Fronthack utilities...');
    console.log(consoleColors.fronthack, 'This command is a wrapper of the "Create React App" project.');
    console.log('');
    console.log(consoleColors.fronthack, 'Fronhack philosophy is to generate and hack - automate boilerplate, expose everything for developer, leave nothing under the hood.');
    console.log(''); // Create React app.

    shell.exec("npx create-react-app ".concat(result.name), {
      async: true
    }, function (code) {
      if (code != 0) throw new Error('Error: Creating React app failed');
      shell.cd(result.name);
      var currentPath = process.cwd(); // Install additional dependencies.

      shell.exec('yarn add copy-webpack-plugin node-sass bem-modifiers', {
        async: true,
        silent: true
      }, function (code) {
        if (code != 0) throw new Error('Error: Adding node dependencies failed');
        shell.exec('yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-standard', {
          async: true,
          silent: true
        }, function (code) {
          if (code != 0) throw new Error('Error: Adding dev dependencies failed');
          shell.exec('git add . && git commit -m "Added fronthack dependencies"', {
            async: true,
            silent: true
          }, function (code) {
            // Eject webpack config.
            shell.exec('echo y | yarn eject', {
              async: true
            }, function (code) {
              if (code != 0) throw new Error('Error: Could not use yarn');
              getFronthackPath(function (fronthackPath) {
                // Apply changes in App.js file.
                fs.readFile("".concat(currentPath, "/src/App.js"), 'utf8', function (err, content) {
                  if (err) throw err;
                  var newContent = content.replace('./App.css', './style/index.sass');
                  fs.writeFile("".concat(currentPath, "/src/App.js"), newContent, function (err) {
                    if (err) throw err; // Perform changes in index.js file.

                    fs.readFile("".concat(fronthackPath, "/templates/fronthack-scripts-import.js"), 'utf8', function (err, scriptsImportTemplate) {
                      if (err) throw err;
                      fs.readFile("".concat(currentPath, "/src/index.js"), 'utf8', function (err, content) {
                        if (err) throw err;
                        var newContent = content.replace("import './index.css';\n", '').concat(scriptsImportTemplate);
                        fs.writeFile("".concat(currentPath, "/src/index.js"), newContent, function (err) {
                          if (err) throw err; // Add eslint config.

                          fs.readFile("".concat(fronthackPath, "/templates/.eslintrc"), 'utf8', function (err, content) {
                            if (err) throw err;
                            fs.writeFile("".concat(currentPath, "/.eslintrc"), content, function (err) {
                              if (err) throw err; // Remove files that are not used anymore.

                              fs.unlink("".concat(currentPath, "/src/index.css"), function (err) {
                                if (err) throw err;
                                fs.unlink("".concat(currentPath, "/src/App.css"), function (err) {
                                  if (err) throw err; // Inject Fronthack development tools to a Webpack config.

                                  fs.readFile("".concat(fronthackPath, "/templates/webpack.config.fronthack-scripts.js"), 'utf8', function (err, WebpackFronthackScripts) {
                                    if (err) throw err;
                                    fs.readFile("".concat(currentPath, "/config/webpack.config.js"), 'utf8', function (err, webpackConfContent) {
                                      if (err) throw err;
                                      var newContent = webpackConfContent.replace("require('webpack');", "require('webpack');\nconst CopyWebpackPlugin = require('copy-webpack-plugin');").replace('WatchMissingNodeModulesPlugin(paths.appNodeModules),', "WatchMissingNodeModulesPlugin(paths.appNodeModules),\n".concat(WebpackFronthackScripts));
                                      fs.writeFile("".concat(currentPath, "/config/webpack.config.js"), newContent, function (err) {
                                        if (err) throw err; // Prepare designs directory.

                                        fs.ensureDir("".concat(currentPath, "/designs"), function (err) {
                                          if (err) throw err;
                                          fs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8', function (err, content) {
                                            if (err) throw err;
                                            fs.writeFile("".concat(currentPath, "/designs/README.md"), content, function (err) {
                                              if (err) throw err;
                                              fetchComponent(currentPath, true, false, 'style', null, function (err) {
                                                if (err) throw err; // Do initial git commit.

                                                shell.exec('git add .', {
                                                  async: true,
                                                  silent: true
                                                }, function (code) {
                                                  // if (code != 0) throw new Error('Error: Could not use git');
                                                  shell.exec('git commit -m "Added fronthack stuff"', {
                                                    async: true,
                                                    silent: true
                                                  }, function (code) {
                                                    // if (code != 0) throw new Error('Error: Could not use git');
                                                    console.log(consoleColors.fronthack, 'Opinionated Fronthack React project is ready for hacking! Begin by typing:');
                                                    console.log('');
                                                    console.log(consoleColors.fronthack, "  cd ".concat(result.name));
                                                    console.log(consoleColors.fronthack, '  yarn start');
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
                });
              });
            });
          });
        });
      });
    });
  });
};