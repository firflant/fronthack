"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _prompt = _interopRequireDefault(require("prompt"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _recursiveCopy = _interopRequireDefault(require("recursive-copy"));

var _getFronthackPath = _interopRequireDefault(require("./getFronthackPath"));

var _output = _interopRequireDefault(require("./output"));

var _fetchComponent = _interopRequireDefault(require("./fetchComponent"));

var _regex = _interopRequireDefault(require("./regex"));

var _userInput = _interopRequireDefault(require("./userInput"));

var _saveConfigFile = _interopRequireDefault(require("./saveConfigFile"));

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
    var _ref2, namePrompt, projectRoot, fronthackPath, config, sassLintRc, htmlHintRc, content;

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
            return (0, _saveConfigFile["default"])(fronthackPath, projectRoot, 'static');

          case 18:
            config = _context.sent;
            _context.next = 21;
            return afs.readFile("".concat(fronthackPath, "/templates/.sasslintrc"), 'utf8');

          case 21:
            sassLintRc = _context.sent;
            _context.next = 24;
            return afs.writeFile("".concat(projectRoot, "/.sasslintrc"), sassLintRc);

          case 24:
            _context.next = 26;
            return afs.readFile("".concat(fronthackPath, "/templates/.htmlhintrc"), 'utf8');

          case 26:
            htmlHintRc = _context.sent;
            _context.next = 29;
            return afs.writeFile("".concat(projectRoot, "/.htmlhintrc"), htmlHintRc);

          case 29:
            _context.next = 31;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/src/designs"));

          case 31:
            _context.next = 33;
            return afs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8');

          case 33:
            content = _context.sent;
            _context.next = 36;
            return afs.writeFile("".concat(projectRoot, "/src/designs/README.md"), content);

          case 36:
            _context.next = 38;
            return _fsExtra["default"].renameSync("".concat(projectRoot, "/.gitignore_template"), "".concat(projectRoot, "/.gitignore"));

          case 38:
            _context.next = 40;
            return _shelljs["default"].cd(projectRoot);

          case 40:
            (0, _output["default"])('Installing node dependencies...');
            _context.next = 43;
            return _shelljs["default"].exec('yarn install');

          case 43:
            _context.next = 45;
            return (0, _fetchComponent["default"])(projectRoot, config, 'style');

          case 45:
            _context.next = 47;
            return _shelljs["default"].exec('git init');

          case 47:
            _context.next = 49;
            return _shelljs["default"].exec('git add .', {
              silent: true
            });

          case 49:
            _context.next = 51;
            return _shelljs["default"].exec('git commit -m "Repository initiated by fronthack init command"', {
              silent: true
            });

          case 51:
            // Output success messages.
            (0, _output["default"])('Fronthack project with Static HTML + ECMAScript features is ready for hacking!\nBegin by typing:');
            (0, _output["default"])('');
            (0, _output["default"])("  cd ".concat(name, "\n  yarn start"));
            (0, _output["default"])('');
            _context.next = 60;
            break;

          case 57:
            _context.prev = 57;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 60:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 57]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;