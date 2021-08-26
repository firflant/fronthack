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

var _output = _interopRequireDefault(require("../helpers/output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(projectRoot, config, type, machinename) {
    var description,
        fronthackPath,
        projectSrc,
        reactComponentTemplatePath,
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
            _context.next = 3;
            return (0, _getFronthackPath["default"])();

          case 3:
            fronthackPath = _context.sent;
            projectSrc = "".concat(projectRoot).concat(config.src);
            _context.t0 = type;
            _context.next = _context.t0 === 'page' ? 8 : 10;
            break;

          case 8:
            reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-page.js");
            return _context.abrupt("break", 12);

          case 10:
            reactComponentTemplatePath = "".concat(fronthackPath, "/templates/react-component-functional.js");
            return _context.abrupt("break", 12);

          case 12:
            if (!(type === 'page')) {
              _context.next = 25;
              break;
            }

            _context.next = 15;
            return _fsExtra["default"].ensureDirSync("".concat(projectSrc, "/").concat(type, "s"));

          case 15:
            _context.next = 17;
            return afs.readFile(reactComponentTemplatePath, 'utf8');

          case 17:
            reactPage = _context.sent;
            parsedReactPage = reactPage.replace(/PageName/g, machinename);
            if (config.type === 'react-next') parsedReactPage = parsedReactPage.replace("import React from 'react'\n", '');
            _context.next = 22;
            return afs.writeFile("".concat(projectSrc, "/").concat(type, "s/").concat(machinename, ".js"), parsedReactPage);

          case 22:
            (0, _output["default"])('Created new page.');
            _context.next = 51;
            break;

          case 25:
            _context.next = 27;
            return _fsExtra["default"].ensureDirSync("".concat(projectSrc, "/").concat(type, "s/").concat(machinename));

          case 27:
            _context.next = 29;
            return afs.readFile(reactComponentTemplatePath, 'utf8');

          case 29:
            reactComponent = _context.sent;
            kebabCase = _case["default"].kebab(machinename);
            humanCase = _case["default"].sentence(machinename);
            parsedReactComponent = reactComponent.replace(/ComponentName/g, machinename).replace('component-name', kebabCase);
            if (config.type === 'react-next') parsedReactComponent = parsedReactComponent.replace("import React from 'react'\n", '');
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
            (0, _output["default"])('Component created.');

          case 51:
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