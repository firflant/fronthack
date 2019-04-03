"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var afs = _interopRequireWildcard(require("async-file"));

var _githubGet = _interopRequireDefault(require("github-get"));

var _case = _interopRequireDefault(require("case"));

var _cliHighlight = require("cli-highlight");

var _consoleColors = _interopRequireDefault(require("./consoleColors"));

var _generateSassComponent = _interopRequireDefault(require("./generateSassComponent"));

var _generateReactComponent = _interopRequireDefault(require("./generateReactComponent"));

var _addImportToApp = _interopRequireDefault(require("./addImportToApp"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fronthackGet = function fronthackGet(path) {
  return new Promise(function (resolve, reject) {
    (0, _githubGet["default"])('frontcraft/fronthack-components', path, function (err, data, content) {
      if (err) reject(err);
      resolve({
        data: data,
        content: content
      });
    });
  });
};

var asyncForEach =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(array, callback) {
    var index;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            index = 0;

          case 1:
            if (!(index < array.length)) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return callback(array[index], index, array);

          case 4:
            index++;
            _context.next = 1;
            break;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function asyncForEach(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Saves components data from fronthack-components GitHub repository for static
 * html version.
 * @argument {string} projectRoot path to the directory of current project
 * @argument {bool} isReact whether current project is based on React
 * @argument {bool} isNext whether current project is based on Next JS
 * @argument {string} machinename unique name identifier of the component
 */


var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(projectRoot, isReact, isNext, machinename) {
    var projectSrc, _ref3, content, baseStylesPath, _ref6, _content, componentPath, _ref7, _content2, componentFiles, _ref10, description, pascalCase, _ref11, _content3, parsedContent, _ref12, readmeContent, markup, _ref13, _description;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            projectSrc = "".concat(projectRoot).concat(isNext ? '' : '/src'); // Exceptional behavior when fetching global styles.

            if (!(machinename === 'style')) {
              _context4.next = 14;
              break;
            }

            _context4.next = 5;
            return fronthackGet('src/style');

          case 5:
            _ref3 = _context4.sent;
            content = _ref3.content;
            baseStylesPath = "".concat(projectSrc, "/").concat(isReact ? 'style' : 'sass/base');
            _context4.next = 10;
            return _fsExtra["default"].ensureDirSync(baseStylesPath);

          case 10:
            _context4.next = 12;
            return asyncForEach(content,
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(file) {
                var _ref5, fileContent;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return fronthackGet("src/style/".concat(file));

                      case 3:
                        _ref5 = _context2.sent;
                        fileContent = _ref5.content;
                        _context2.next = 7;
                        return afs.writeFile("".concat(baseStylesPath, "/").concat(file), fileContent);

                      case 7:
                        _context2.next = 12;
                        break;

                      case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](0);
                        throw new Error(_context2.t0);

                      case 12:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 9]]);
              }));

              return function (_x7) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 12:
            _context4.next = 79;
            break;

          case 14:
            if (!(isReact && machinename === 'Form')) {
              _context4.next = 19;
              break;
            }

            console.log(_consoleColors["default"].fronthack, 'The advanced Fronthack Form component has been promoted to a standalone npm package. To use it on a project, do following:');
            console.log(_consoleColors["default"].fronthack, 'yarn add react-standalone-form'); // Behavior when fetching everything else.

            _context4.next = 79;
            break;

          case 19:
            console.log(_consoleColors["default"].fronthack, 'Fetching data from a Fronthack components repository...');
            _context4.next = 22;
            return fronthackGet('src/components');

          case 22:
            _ref6 = _context4.sent;
            _content = _ref6.content;

            if (!isReact) {
              _context4.next = 49;
              break;
            }

            if (!_content.includes(machinename)) {
              _context4.next = 39;
              break;
            }

            componentPath = "".concat(projectSrc, "/components/").concat(machinename);
            _context4.next = 29;
            return _fsExtra["default"].ensureDirSync(componentPath);

          case 29:
            _context4.next = 31;
            return fronthackGet("src/components/".concat(machinename));

          case 31:
            _ref7 = _context4.sent;
            _content2 = _ref7.content;
            componentFiles = _content2.filter(function (file) {
              return file !== 'EXAMPLE.js';
            });
            _context4.next = 36;
            return asyncForEach(componentFiles,
            /*#__PURE__*/
            function () {
              var _ref8 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(file) {
                var _ref9, fileContent, parsedContent;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return fronthackGet("src/components/".concat(machinename, "/").concat(file));

                      case 3:
                        _ref9 = _context3.sent;
                        fileContent = _ref9.content;
                        parsedContent = isNext && file === "".concat(machinename, ".js") ? fileContent.replace("import React from 'react'\n", '') : fileContent;
                        _context3.next = 8;
                        return afs.writeFile("".concat(componentPath, "/").concat(file), parsedContent);

                      case 8:
                        _context3.next = 13;
                        break;

                      case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3["catch"](0);
                        throw new Error(_context3.t0);

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[0, 10]]);
              }));

              return function (_x8) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 36:
            console.log(_consoleColors["default"].fronthack, 'Found Fronthack component of given name and imported its code.');
            _context4.next = 47;
            break;

          case 39:
            console.log(_consoleColors["default"].fronthack, "There is no ready Fronthack component of name ".concat(machinename, "."));
            console.log(_consoleColors["default"].fronthack, 'Generating a new blank one...');
            _context4.next = 43;
            return (0, _userInput["default"])({
              name: 'description',
              description: 'Write short component description',
              type: 'string'
            });

          case 43:
            _ref10 = _context4.sent;
            description = _ref10.description;
            _context4.next = 47;
            return (0, _generateReactComponent["default"])(projectRoot, isNext, 'component', machinename, description);

          case 47:
            _context4.next = 79;
            break;

          case 49:
            pascalCase = _case["default"].pascal(machinename);

            if (!_content.includes(pascalCase)) {
              _context4.next = 71;
              break;
            }

            _context4.next = 53;
            return fronthackGet("src/components/".concat(pascalCase, "/style.sass"));

          case 53:
            _ref11 = _context4.sent;
            _content3 = _ref11.content;
            parsedContent = _content3 // Remove imports unnecessary for static version
            .replace(/^.*@import.*\n+/gm, '') // Exceptional behavior that fixes icon font path.
            .replace('./fonts/waat-icons', '../fonts/waat-icons');
            _context4.next = 58;
            return afs.writeFile("".concat(projectSrc, "/sass/components/_").concat(machinename, ".sass"), parsedContent);

          case 58:
            _context4.next = 60;
            return fronthackGet("src/components/".concat(pascalCase, "/README.md"));

          case 60:
            _ref12 = _context4.sent;
            readmeContent = _ref12.content;
            console.log(_consoleColors["default"].fronthack, 'Found Fronthack component of given name and imported its code.');
            markup = readmeContent.match(/(?<=```html\n)[\s\S]*?(?=\n```)/m)[0];
            console.log(_consoleColors["default"].fronthack, '\n------------------------------------------------------------\n');
            console.log((0, _cliHighlight.highlight)(markup, {
              language: 'html'
            }));
            console.log(_consoleColors["default"].fronthack, '\n------------------------------------------------------------\n');
            _context4.next = 69;
            return (0, _addImportToApp["default"])(projectSrc, 'component', machinename);

          case 69:
            _context4.next = 79;
            break;

          case 71:
            console.log(_consoleColors["default"].fronthack, "There is no ready Fronthack component of name ".concat(machinename, "."));
            console.log(_consoleColors["default"].fronthack, 'Generating a new blank one...');
            _context4.next = 75;
            return (0, _userInput["default"])({
              name: 'description',
              description: 'Write short component description',
              type: 'string'
            });

          case 75:
            _ref13 = _context4.sent;
            _description = _ref13.description;
            _context4.next = 79;
            return (0, _generateSassComponent["default"])(projectSrc, 'component', machinename, _description);

          case 79:
            _context4.next = 84;
            break;

          case 81:
            _context4.prev = 81;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 84:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 81]]);
  }));

  return function (_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;