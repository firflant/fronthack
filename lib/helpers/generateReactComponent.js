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

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _case = _interopRequireDefault(require("case"));

var _getFronthackPath = _interopRequireDefault(require("./getFronthackPath"));

var _consoleColors = _interopRequireDefault(require("./consoleColors"));

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
  regeneratorRuntime.mark(function _callee(projectRoot, projectType, type, machinename) {
    var description,
        projectSrc,
        fronthackPath,
        reactComponentTemplatePath,
        _ref2,
        componentType,
        reactPage,
        parsedReactPage,
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
            projectSrc = "".concat(projectRoot).concat(projectType === 'react-next' ? '' : '/src');
            _context.next = 4;
            return (0, _getFronthackPath["default"])();

          case 4:
            fronthackPath = _context.sent;
            _context.t0 = type;
            _context.next = _context.t0 === 'page' ? 8 : 10;
            break;

          case 8:
            reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-page.js");
            return _context.abrupt("break", 20);

          case 10:
            if (!(projectType !== 'react-next')) {
              _context.next = 18;
              break;
            }

            _context.next = 13;
            return (0, _userInput["default"])({
              name: 'componentType',
              description: "Choose a type of component?\n1 - Stateless ( const ".concat(machinename, " = () => )\n2 - Class     ( class ").concat(machinename, " extends React.Component )\n"),
              pattern: '1|2',
              message: 'Choose option "1" or "2"',
              type: 'number'
            });

          case 13:
            _ref2 = _context.sent;
            componentType = _ref2.componentType;
            reactComponentTemplatePath = componentType === 1 ? "".concat(fronthackPath, "/templates/react-component-functional.js") : "".concat(fronthackPath, "/templates/react-component-class.js");
            _context.next = 19;
            break;

          case 18:
            reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-component-functional.js");

          case 19:
            return _context.abrupt("break", 20);

          case 20:
            if (!(type === 'page')) {
              _context.next = 33;
              break;
            }

            _context.next = 23;
            return _fsExtra["default"].ensureDirSync("".concat(projectSrc, "/").concat(type, "s"));

          case 23:
            _context.next = 25;
            return afs.readFile(reactComponentTemplatePath, 'utf8');

          case 25:
            reactPage = _context.sent;
            parsedReactPage = reactPage.replace(/PageName/g, machinename);
            if (projectType === 'react-next') parsedReactPage = parsedReactPage.replace("import React from 'react'\n", '');
            _context.next = 30;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, ".js"), parsedReactPage);

          case 30:
            console.log(_consoleColors["default"].fronthack, 'Created new page.');
            _context.next = 59;
            break;

          case 33:
            _context.next = 35;
            return _fsExtra["default"].ensureDirSync("".concat(projectSrc, "/").concat(type, "s/").concat(machinename));

          case 35:
            _context.next = 37;
            return afs.readFile(reactComponentTemplatePath, 'utf8');

          case 37:
            reactComponent = _context.sent;
            kebabCase = _case["default"].kebab(machinename);
            humanCase = _case["default"].sentence(machinename);
            parsedReactComponent = reactComponent.replace(/ComponentName/g, machinename).replace('component-name', kebabCase);
            if (projectType === 'react-next') parsedReactComponent = parsedReactComponent.replace("import React from 'react'\n", '');
            if (description) parsedReactComponent = parsedReactComponent.replace('Description', description);
            _context.next = 45;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/").concat(machinename, ".js"), parsedReactComponent);

          case 45:
            _context.next = 47;
            return afs.readFile("".concat(fronthackPath, "/templates/sass-component.sass"), 'utf8');

          case 47:
            sassContent = _context.sent;
            parsedSassContent = sassContent.replace('// Name', "@import '../../style/variables'\n@import '../../style/mixins'\n\n// Name").replace('Name', humanCase).replace(/name/g, kebabCase);
            if (description) parsedSassContent = parsedSassContent.replace('Description', description);
            _context.next = 52;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/style.sass"), parsedSassContent);

          case 52:
            _context.next = 54;
            return afs.readFile("".concat(fronthackPath, "/templates/react-component-index.js"), 'utf8');

          case 54:
            indexFile = _context.sent;
            parsedIndexFile = indexFile.replace('ComponentName', machinename);
            _context.next = 58;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, "/index.js"), parsedIndexFile);

          case 58:
            console.log(_consoleColors["default"].fronthack, 'Component created.');

          case 59:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;