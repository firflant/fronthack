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

var _download = _interopRequireDefault(require("download"));

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
    var _ref2, namePrompt, projectRoot, fronthackPath, content, fronthackScriptsUrl, indexJs, styles, codeIcon, pictureIcon;

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
              "default": 'fronthack-jekyll'
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
            return _shelljs["default"].exec("jekyll new ".concat(name));

          case 16:
            _context.next = 18;
            return (0, _recursiveCopy["default"])("".concat(fronthackPath, "/templates/jekyll-suite"), projectRoot, {
              overwrite: true
            });

          case 18:
            _context.next = 20;
            return _shelljs["default"].cd(projectRoot);

          case 20:
            _context.next = 22;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/designs"));

          case 22:
            _context.next = 24;
            return afs.readFile("".concat(fronthackPath, "/templates/designs-readme.md"), 'utf8');

          case 24:
            content = _context.sent;
            _context.next = 27;
            return afs.writeFile("".concat(projectRoot, "/designs/README.md"), content);

          case 27:
            _context.next = 29;
            return (0, _recursiveCopy["default"])("".concat(fronthackPath, "/templates/static-repo/src/sass"), "".concat(projectRoot, "/sass"));

          case 29:
            _context.next = 31;
            return (0, _fetchComponent["default"])("".concat(projectRoot), 'jekyll', 'style');

          case 31:
            _context.next = 33;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/dev-assets"));

          case 33:
            _context.next = 35;
            return _fsExtra["default"].ensureDirSync("".concat(projectRoot, "/dev-assets/icons"));

          case 35:
            fronthackScriptsUrl = 'https://raw.githubusercontent.com/frontcraft/fronthack-scripts/master/';
            _context.next = 38;
            return (0, _download["default"])("".concat(fronthackScriptsUrl, "index.js"));

          case 38:
            indexJs = _context.sent;
            _context.next = 41;
            return afs.writeFile("".concat(projectRoot, "/dev.js"), indexJs);

          case 41:
            _context.next = 43;
            return (0, _download["default"])("".concat(fronthackScriptsUrl, "dev-assets/styles.css"));

          case 43:
            styles = _context.sent;
            _context.next = 46;
            return afs.writeFile("".concat(projectRoot, "/dev-assets/styles.css"), styles);

          case 46:
            _context.next = 48;
            return (0, _download["default"])("".concat(fronthackScriptsUrl, "dev-assets/icons/code.png"));

          case 48:
            codeIcon = _context.sent;
            _context.next = 51;
            return afs.writeFile("".concat(projectRoot, "/dev-assets/icons/code.png"), codeIcon);

          case 51:
            _context.next = 53;
            return (0, _download["default"])("".concat(fronthackScriptsUrl, "dev-assets/icons/picture-o.png"));

          case 53:
            pictureIcon = _context.sent;
            _context.next = 56;
            return afs.writeFile("".concat(projectRoot, "/dev-assets/icons/picture-o.png"), pictureIcon);

          case 56:
            _context.next = 58;
            return _shelljs["default"].exec('git init');

          case 58:
            _context.next = 60;
            return _shelljs["default"].exec('git add .', {
              silent: true
            });

          case 60:
            _context.next = 62;
            return _shelljs["default"].exec('git commit -m "Repository initiated by fronthack init command"', {
              silent: true
            });

          case 62:
            // Output success messages.
            console.log(_consoleColors["default"].fronthack, 'Fronthack Jekyll site is ready for hacking!\nBegin by typing:');
            console.log('');
            console.log(_consoleColors["default"].fronthack, "  cd ".concat(name, "\n  jekyll serve"));
            console.log('');
            _context.next = 71;
            break;

          case 68:
            _context.prev = 68;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 71:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 68]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;