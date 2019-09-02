"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _prompt = _interopRequireDefault(require("prompt"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _getFronthackPath = _interopRequireDefault(require("./getFronthackPath"));

var _consoleColors = _interopRequireDefault(require("./consoleColors"));

var _fetchComponent = _interopRequireDefault(require("./fetchComponent"));

var _regex = _interopRequireDefault(require("./regex"));

var _userInput = _interopRequireDefault(require("./userInput"));

var _saveConfigFile = _interopRequireDefault(require("./saveConfigFile"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(name) {
    var _ref2, namePrompt, fronthackPath, projectRoot, config, content, newContent, scriptsImportTemplate, indexContent, newIndexContent, eslintContent, WebpackFronthackScripts, webpackConfContent, newWebpackConfContent, readmeContent;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (name) {
              _context.next = 8;
              break;
            }

            _prompt["default"].start();

            _context.next = 5;
            return (0, _userInput["default"])({
              name: 'namePrompt',
              description: 'Directory of installation',
              type: 'string',
              pattern: _regex["default"].projectName,
              message: 'Name must be only letters, numbers dashes or underscores',
              "default": 'fronthack-react'
            });

          case 5:
            _ref2 = _context.sent;
            namePrompt = _ref2.namePrompt;
            name = namePrompt;

          case 8:
            _context.next = 10;
            return (0, _getFronthackPath["default"])();

          case 10:
            fronthackPath = _context.sent;
            // Create React app.
            console.log(_consoleColors["default"].fronthack, 'Running create-react-app command...');
            _context.next = 14;
            return _shelljs["default"].exec("npx create-react-app ".concat(name));

          case 14:
            _context.next = 16;
            return _shelljs["default"].cd(name);

          case 16:
            projectRoot = process.cwd(); // Install additional dependencies.

            console.log(_consoleColors["default"].fronthack, 'Installing additional dependencies...');
            _context.next = 20;
            return _shelljs["default"].exec('yarn add @babel/plugin-transform-react-jsx-source copy-webpack-plugin node-sass bem-modifiers', {
              silent: true
            });

          case 20:
            _context.next = 22;
            return _shelljs["default"].exec('yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-standard', {
              silent: true
            });

          case 22:
            _context.next = 24;
            return _shelljs["default"].exec('git add . && git commit -m "Added fronthack dependencies"', {
              silent: true
            });

          case 24:
            // Eject webpack config.
            console.log(_consoleColors["default"].fronthack, 'Customizing a project for Fronthack...');
            _context.next = 27;
            return _shelljs["default"].exec('echo y | yarn eject');

          case 27:
            _context.next = 29;
            return (0, _saveConfigFile["default"])(fronthackPath, projectRoot, 'react');

          case 29:
            config = _context.sent;
            _context.next = 32;
            return afs.readFile("".concat(projectRoot, "/src/App.js"), 'utf8');

          case 32:
            content = _context.sent;
            newContent = content.replace('./App.css', './style/index.sass');
            _context.next = 36;
            return afs.writeFile("".concat(projectRoot, "/src/App.js"), newContent);

          case 36:
            _context.next = 38;
            return afs.readFile("".concat(fronthackPath, "/templates/fronthack-scripts-import.js"), 'utf8');

          case 38:
            scriptsImportTemplate = _context.sent;
            _context.next = 41;
            return afs.readFile("".concat(projectRoot, "/src/index.js"), 'utf8');

          case 41:
            indexContent = _context.sent;
            newIndexContent = indexContent.replace("import './index.css';\n", '').concat(scriptsImportTemplate);
            _context.next = 45;
            return afs.writeFile("".concat(projectRoot, "/src/index.js"), newIndexContent);

          case 45:
            _context.next = 47;
            return afs.readFile("".concat(fronthackPath, "/templates/.eslintrc"), 'utf8');

          case 47:
            eslintContent = _context.sent;
            _context.next = 50;
            return afs.writeFile("".concat(projectRoot, "/.eslintrc"), eslintContent);

          case 50:
            _context.next = 52;
            return _fsExtra["default"].unlinkSync("".concat(projectRoot, "/src/index.css"));

          case 52:
            _context.next = 54;
            return _fsExtra["default"].unlinkSync("".concat(projectRoot, "/src/App.css"));

          case 54:
            _context.next = 56;
            return afs.readFile("".concat(fronthackPath, "/templates/webpack.config.fronthack-scripts.js"), 'utf8');

          case 56:
            WebpackFronthackScripts = _context.sent;
            _context.next = 59;
            return afs.readFile("".concat(projectRoot, "/config/webpack.config.js"), 'utf8');

          case 59:
            webpackConfContent = _context.sent;
            newWebpackConfContent = webpackConfContent.replace("require('webpack');", "require('webpack');\nconst CopyWebpackPlugin = require('copy-webpack-plugin');").replace('WatchMissingNodeModulesPlugin(paths.appNodeModules),', "WatchMissingNodeModulesPlugin(paths.appNodeModules),\n".concat(WebpackFronthackScripts));
            _context.next = 63;
            return afs.writeFile("".concat(projectRoot, "/config/webpack.config.js"), newWebpackConfContent);

          case 63:
            _context.next = 65;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/designs"));

          case 65:
            _context.next = 67;
            return afs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8');

          case 67:
            readmeContent = _context.sent;
            _context.next = 70;
            return afs.writeFile("".concat(projectRoot, "/designs/README.md"), readmeContent);

          case 70:
            _context.next = 72;
            return (0, _fetchComponent["default"])(projectRoot, config, 'style');

          case 72:
            _context.next = 74;
            return _shelljs["default"].exec('npx eslint src --fix');

          case 74:
            _context.next = 76;
            return _shelljs["default"].exec('git add .', {
              silent: true
            });

          case 76:
            _context.next = 78;
            return _shelljs["default"].exec('git commit -m "Added fronthack stuff"', {
              silent: true
            });

          case 78:
            // Display output.
            console.log(_consoleColors["default"].fronthack, 'Opinionated Fronthack React project is ready for hacking!\nBegin by typing:');
            console.log('');
            console.log(_consoleColors["default"].fronthack, "  cd ".concat(name));
            console.log(_consoleColors["default"].fronthack, '  yarn start');
            console.log('');
            _context.next = 88;
            break;

          case 85:
            _context.prev = 85;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 88:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 85]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;