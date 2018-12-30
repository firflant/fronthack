"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _prompt = _interopRequireDefault(require("prompt"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _recursiveCopy = _interopRequireDefault(require("recursive-copy"));

var _getFronthackPath = _interopRequireDefault(require("../helpers/getFronthackPath"));

var _consoleColors = _interopRequireDefault(require("../helpers/consoleColors"));

var _fetchComponent = _interopRequireDefault(require("../helpers/fetchComponent"));

var _regex = _interopRequireDefault(require("../helpers/regex"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var _ref2, name, projectRoot, fronthackPath, readmeContent, scriptsImportTemplate, appContent, newAppContent, eslintContent;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          // Collect variables.
          _prompt.default.start();

          _context.next = 4;
          return (0, _userInput.default)({
            name: 'name',
            description: 'Directory of installation',
            type: 'string',
            pattern: _regex.default.projectName,
            message: 'Name must be only letters, numbers dashes or underscores',
            default: 'fronthack-next'
          });

        case 4:
          _ref2 = _context.sent;
          name = _ref2.name;

          if (!(name === 'fronthack')) {
            _context.next = 8;
            break;
          }

          throw new Error('Name should be different than fronthack');

        case 8:
          console.log(_consoleColors.default.fronthack, 'Initiating Fronthack directory for new project...');
          projectRoot = "".concat(process.cwd(), "/").concat(name);
          _context.next = 12;
          return (0, _getFronthackPath.default)();

        case 12:
          fronthackPath = _context.sent;
          _context.next = 15;
          return (0, _recursiveCopy.default)("".concat(fronthackPath, "/templates/next-repo"), projectRoot, {
            dot: true
          });

        case 15:
          _context.next = 17;
          return _shelljs.default.cd(projectRoot);

        case 17:
          _context.next = 19;
          return _fsExtra.default.ensureDirSync("".concat(projectRoot, "/designs"));

        case 19:
          _context.next = 21;
          return afs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8');

        case 21:
          readmeContent = _context.sent;
          _context.next = 24;
          return afs.writeFile("".concat(projectRoot, "/designs/README.md"), readmeContent);

        case 24:
          _context.next = 26;
          return _fsExtra.default.renameSync("".concat(projectRoot, "/.gitignore_template"), "".concat(projectRoot, "/.gitignore"));

        case 26:
          // Install dependencies
          console.log(_consoleColors.default.fronthack, 'Installing node dependencies...');
          _context.next = 29;
          return _shelljs.default.exec('yarn install && yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard', {
            silent: false
          });

        case 29:
          _context.next = 31;
          return afs.readFile("".concat(fronthackPath, "/templates/fronthack-scripts-import.js"), 'utf8');

        case 31:
          scriptsImportTemplate = _context.sent;
          _context.next = 34;
          return afs.readFile("".concat(projectRoot, "/pages/_app.js"), 'utf8');

        case 34:
          appContent = _context.sent;
          newAppContent = appContent.replace('  render () {', "  componentDidMount() {".concat(scriptsImportTemplate, "\n  }\n\n  render () {"));
          _context.next = 38;
          return afs.writeFile("".concat(projectRoot, "/pages/_app.js"), newAppContent);

        case 38:
          _context.next = 40;
          return afs.readFile("".concat(fronthackPath, "/templates/.eslintrc"), 'utf8');

        case 40:
          eslintContent = _context.sent;
          _context.next = 43;
          return afs.writeFile("".concat(projectRoot, "/.eslintrc"), eslintContent);

        case 43:
          _context.next = 45;
          return (0, _fetchComponent.default)(projectRoot, true, true, 'style', null);

        case 45:
          _context.next = 47;
          return _shelljs.default.exec('git init');

        case 47:
          _context.next = 49;
          return _shelljs.default.exec('git add .', {
            silent: true
          });

        case 49:
          _context.next = 51;
          return _shelljs.default.exec('git commit -m "Repository initiated by fronthack"', {
            silent: true
          });

        case 51:
          // Display output.
          console.log(_consoleColors.default.fronthack, 'Opinionated Fronthack Next project is ready for hacking! Begin by typing:');
          console.log('');
          console.log(_consoleColors.default.fronthack, "  cd ".concat(name));
          console.log(_consoleColors.default.fronthack, '  yarn dev');
          console.log('');
          _context.next = 61;
          break;

        case 58:
          _context.prev = 58;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0);

        case 61:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 58]]);
}));

exports.default = _default;