"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _prompt = _interopRequireDefault(require("prompt"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _recursiveCopy = _interopRequireDefault(require("recursive-copy"));

var _getFronthackPath = _interopRequireDefault(require("./getFronthackPath"));

var _consoleColors = _interopRequireDefault(require("./consoleColors"));

var _fetchComponent = _interopRequireDefault(require("./fetchComponent"));

var _regex = _interopRequireDefault(require("./regex"));

var _userInput = _interopRequireDefault(require("./userInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(name) {
    var _ref2, namePrompt, projectRoot, fronthackPath, readmeContent, scriptsImportTemplate, appContent, newAppContent, eslintContent;

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
              "default": 'fronthack-next'
            });

          case 5:
            _ref2 = _context.sent;
            namePrompt = _ref2.namePrompt;
            name = namePrompt;

          case 8:
            if (!(name === 'fronthack')) {
              _context.next = 10;
              break;
            }

            throw new Error('Name should be different than fronthack');

          case 10:
            projectRoot = "".concat(process.cwd(), "/").concat(name);
            _context.next = 13;
            return (0, _getFronthackPath["default"])();

          case 13:
            fronthackPath = _context.sent;
            _context.next = 16;
            return (0, _recursiveCopy["default"])("".concat(fronthackPath, "/templates/next-repo"), projectRoot, {
              dot: true
            });

          case 16:
            _context.next = 18;
            return _shelljs["default"].cd(projectRoot);

          case 18:
            _context.next = 20;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/designs"));

          case 20:
            _context.next = 22;
            return afs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8');

          case 22:
            readmeContent = _context.sent;
            _context.next = 25;
            return afs.writeFile("".concat(projectRoot, "/designs/README.md"), readmeContent);

          case 25:
            _context.next = 27;
            return _fsExtra["default"].renameSync("".concat(projectRoot, "/.gitignore_template"), "".concat(projectRoot, "/.gitignore"));

          case 27:
            // Install dependencies
            console.log(_consoleColors["default"].fronthack, 'Installing node dependencies...');
            _context.next = 30;
            return _shelljs["default"].exec('yarn install && yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard', {
              silent: false
            });

          case 30:
            _context.next = 32;
            return afs.readFile("".concat(fronthackPath, "/templates/fronthack-scripts-import.js"), 'utf8');

          case 32:
            scriptsImportTemplate = _context.sent;
            _context.next = 35;
            return afs.readFile("".concat(projectRoot, "/pages/_app.js"), 'utf8');

          case 35:
            appContent = _context.sent;
            newAppContent = appContent.replace('  render () {', "  componentDidMount() {".concat(scriptsImportTemplate, "\n  }\n\n  render () {"));
            _context.next = 39;
            return afs.writeFile("".concat(projectRoot, "/pages/_app.js"), newAppContent);

          case 39:
            _context.next = 41;
            return afs.readFile("".concat(fronthackPath, "/templates/.eslintrc"), 'utf8');

          case 41:
            eslintContent = _context.sent;
            _context.next = 44;
            return afs.writeFile("".concat(projectRoot, "/.eslintrc"), eslintContent);

          case 44:
            _context.next = 46;
            return (0, _fetchComponent["default"])(projectRoot, true, true, 'style', null);

          case 46:
            _context.next = 48;
            return _shelljs["default"].exec('git init');

          case 48:
            _context.next = 50;
            return _shelljs["default"].exec('git add .', {
              silent: true
            });

          case 50:
            _context.next = 52;
            return _shelljs["default"].exec('git commit -m "Repository initiated by fronthack"', {
              silent: true
            });

          case 52:
            // Display output.
            console.log(_consoleColors["default"].fronthack, 'Opinionated Fronthack Next project is ready for hacking!\nBegin by typing:');
            console.log('');
            console.log(_consoleColors["default"].fronthack, "  cd ".concat(name));
            console.log(_consoleColors["default"].fronthack, '  yarn dev');
            console.log('');
            _context.next = 62;
            break;

          case 59:
            _context.prev = 59;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 62:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 59]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;