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

var _prompt = _interopRequireDefault(require("prompt"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _recursiveCopy = _interopRequireDefault(require("recursive-copy"));

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _getFronthackPath = _interopRequireDefault(require("./getFronthackPath"));

var _output = _interopRequireDefault(require("./output"));

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
    var _ref2, namePrompt, projectRoot, fronthackPath, config, scriptsImportTemplate, indexContent, newIndexContent, eslintContent, sassLintRc, readmeContent;

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
            return (0, _recursiveCopy["default"])("".concat(fronthackPath, "/templates/react-repo"), projectRoot, {
              dot: true
            });

          case 16:
            _context.next = 18;
            return _shelljs["default"].cd(projectRoot);

          case 18:
            _context.next = 20;
            return (0, _saveConfigFile["default"])(fronthackPath, projectRoot, 'react');

          case 20:
            config = _context.sent;
            _context.next = 23;
            return afs.readFile("".concat(fronthackPath, "/templates/fronthack-scripts-import.js"), 'utf8');

          case 23:
            scriptsImportTemplate = _context.sent;
            _context.next = 26;
            return afs.readFile("".concat(projectRoot, "/src/index.js"), 'utf8');

          case 26:
            indexContent = _context.sent;
            newIndexContent = indexContent.concat(scriptsImportTemplate);
            _context.next = 30;
            return afs.writeFile("".concat(projectRoot, "/src/index.js"), newIndexContent);

          case 30:
            _context.next = 32;
            return afs.readFile("".concat(fronthackPath, "/templates/.eslintrc"), 'utf8');

          case 32:
            eslintContent = _context.sent;
            _context.next = 35;
            return afs.writeFile("".concat(projectRoot, "/.eslintrc"), eslintContent);

          case 35:
            _context.next = 37;
            return afs.readFile("".concat(fronthackPath, "/templates/.sasslintrc"), 'utf8');

          case 37:
            sassLintRc = _context.sent;
            _context.next = 40;
            return afs.writeFile("".concat(projectRoot, "/.sasslintrc"), sassLintRc);

          case 40:
            _context.next = 42;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/designs"));

          case 42:
            _context.next = 44;
            return afs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8');

          case 44:
            readmeContent = _context.sent;
            _context.next = 47;
            return afs.writeFile("".concat(projectRoot, "/designs/README.md"), readmeContent);

          case 47:
            _context.next = 49;
            return (0, _fetchComponent["default"])(projectRoot, config, 'style');

          case 49:
            _context.next = 51;
            return _shelljs["default"].exec('yarn install');

          case 51:
            _context.next = 53;
            return _shelljs["default"].exec('git init');

          case 53:
            _context.next = 55;
            return _shelljs["default"].exec('git add .', {
              silent: true
            });

          case 55:
            _context.next = 57;
            return _shelljs["default"].exec('git commit -m "Repository initiated by fronthack"', {
              silent: true
            });

          case 57:
            // Display output.
            (0, _output["default"])('Fronthack React project is ready for hacking!\nBegin by typing:');
            (0, _output["default"])('');
            (0, _output["default"])("  cd ".concat(name));
            (0, _output["default"])('  yarn start');
            (0, _output["default"])('');
            _context.next = 67;
            break;

          case 64:
            _context.prev = 64;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 67:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 64]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;