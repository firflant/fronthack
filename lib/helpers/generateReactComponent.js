"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var afs = _interopRequireWildcard(require("async-file"));

var _case = _interopRequireDefault(require("case"));

var _getFronthackPath = _interopRequireDefault(require("../helpers/getFronthackPath"));

var _consoleColors = _interopRequireDefault(require("./consoleColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Generate blank React component from template.
 * @argument {string} projectRoot path to the directory of current project
 * @argument {bool} isNext whether current project is based on Next JS
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 */
var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(projectRoot, isNext, type, machinename) {
    var description,
        projectSrc,
        fronthackPath,
        reactComponentTemplatePath,
        reactScreen,
        parsedReactScreen,
        reactComponent,
        kebabCase,
        humanCase,
        parsedReactComponent,
        sassContent,
        parsedSassContent,
        indexFile,
        parsedIndexFile,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            description = _args.length > 4 && _args[4] !== undefined ? _args[4] : null;
            projectSrc = "".concat(projectRoot).concat(isNext ? '' : '/src');
            _context.next = 4;
            return (0, _getFronthackPath.default)();

          case 4:
            fronthackPath = _context.sent;
            _context.t0 = type;
            _context.next = _context.t0 === 'page' ? 8 : _context.t0 === 'layout' ? 10 : 12;
            break;

          case 8:
            reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-page.js");
            return _context.abrupt("break", 14);

          case 10:
            reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-component-functional.js");
            return _context.abrupt("break", 14);

          case 12:
            reactComponentTemplatePath = isNext ? "".concat(fronthackPath, "/templates/react-component-functional.js") : "".concat(fronthackPath, "/templates/react-component-class.js");
            return _context.abrupt("break", 14);

          case 14:
            if (!(type === 'page')) {
              _context.next = 25;
              break;
            }

            _context.next = 17;
            return afs.ensureDir("".concat(projectSrc, "/").concat(type, "s"));

          case 17:
            reactScreen = afs.readFile(reactComponentTemplatePath, 'utf8');
            parsedReactScreen = reactScreen.replace(/PageName/g, machinename);
            if (isNext) parsedReactScreen = parsedReactScreen.replace("import React from 'react'\n", '');
            _context.next = 22;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, ".js"), parsedReactScreen);

          case 22:
            console.log(_consoleColors.default.fronthack, 'Done!');
            _context.next = 51;
            break;

          case 25:
            _context.next = 27;
            return afs.ensureDir("".concat(projectSrc, "/").concat(type, "s/").concat(machinename));

          case 27:
            _context.next = 29;
            return afs.readFile(reactComponentTemplatePath, 'utf8');

          case 29:
            reactComponent = _context.sent;
            kebabCase = _case.default.kebab(machinename);
            humanCase = _case.default.sentence(machinename);
            parsedReactComponent = reactComponent.replace(/ComponentName/g, machinename).replace('component-name', kebabCase);
            if (isNext) parsedReactComponent = parsedReactComponent.replace("import React from 'react'\n", '');
            if (description) parsedReactComponent = parsedReactComponent.replace('Description', description);
            _context.next = 37;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/").concat(machinename, ".js"), parsedReactComponent);

          case 37:
            _context.next = 39;
            return afs.readFile("".concat(fronthackPath, "/templates/sass-component.sass"), 'utf8');

          case 39:
            sassContent = _context.sent;
            parsedSassContent = sassContent.replace('// Name', "@import '../../style/variables'\n@import '../../style/mixins'\n\n// Name").replace('Name', humanCase).replace(/name/g, kebabCase);
            if (description) parsedSassContent = parsedSassContent.replace('Description', description);
            _context.next = 44;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/style.sass"), parsedSassContent);

          case 44:
            _context.next = 46;
            return afs.readFile("".concat(fronthackPath, "/templates/react-component-index.js"), 'utf8');

          case 46:
            indexFile = _context.sent;
            parsedIndexFile = indexFile.replace('ComponentName', machinename);
            _context.next = 50;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/index.js"), parsedIndexFile);

          case 50:
            console.log(_consoleColors.default.fronthack, 'Done!');

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;