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

var _getFronthackPath = _interopRequireDefault(require("../helpers/getFronthackPath"));

var _consoleColors = _interopRequireDefault(require("../helpers/consoleColors"));

var _fetchComponent = _interopRequireDefault(require("../helpers/fetchComponent"));

var _regex = _interopRequireDefault(require("../helpers/regex"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

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
    var _ref2, namePrompt, projectRoot, fronthackPath, content;

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
              "default": 'fronthack-static'
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
            return (0, _recursiveCopy["default"])("".concat(fronthackPath, "/templates/static-repo"), projectRoot, {
              dot: true
            });

          case 16:
            _context.next = 18;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/src/designs"));

          case 18:
            _context.next = 20;
            return afs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8');

          case 20:
            content = _context.sent;
            _context.next = 23;
            return afs.writeFile("".concat(projectRoot, "/src/designs/README.md"), content);

          case 23:
            _context.next = 25;
            return _fsExtra["default"].renameSync("".concat(projectRoot, "/.gitignore_template"), "".concat(projectRoot, "/.gitignore"));

          case 25:
            _context.next = 27;
            return _shelljs["default"].cd(projectRoot);

          case 27:
            console.log(_consoleColors["default"].fronthack, 'Installing node dependencies...');
            _context.next = 30;
            return _shelljs["default"].exec('yarn install');

          case 30:
            _context.next = 32;
            return (0, _fetchComponent["default"])(projectRoot, false, false, 'style', null);

          case 32:
            _context.next = 34;
            return _shelljs["default"].exec('git init');

          case 34:
            _context.next = 36;
            return _shelljs["default"].exec('git add .', {
              silent: true
            });

          case 36:
            _context.next = 38;
            return _shelljs["default"].exec('git commit -m "Repository initiated by fronthack init command"', {
              silent: true
            });

          case 38:
            // Output success messages.
            console.log(_consoleColors["default"].fronthack, 'Fronthack Static HTML+jQuery project is ready for hacking!\nBegin by typing:');
            console.log('');
            console.log(_consoleColors["default"].fronthack, "  cd ".concat(name, "\n  yarn start"));
            console.log('');
            _context.next = 47;
            break;

          case 44:
            _context.prev = 44;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 44]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;