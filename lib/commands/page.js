"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var afs = _interopRequireWildcard(require("async-file"));

var _prompt = _interopRequireDefault(require("prompt"));

var _getFronthackPath = _interopRequireDefault(require("../helpers/getFronthackPath"));

var _regex = _interopRequireDefault(require("../helpers/regex"));

var _generateReactComponent = _interopRequireDefault(require("../helpers/generateReactComponent"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

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
  regeneratorRuntime.mark(function _callee(projectRoot, config, name) {
    var _ref2, namePrompt, fronthackPath, content, _content;

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
              description: 'Name of new page (eg. contact, news, about)',
              type: 'string',
              pattern: config.type.includes('react') ? _regex["default"].pascalCase : _regex["default"].kebabCase,
              message: "Name must be in ".concat(config.type.includes('react') ? 'PascalCase' : 'kebab-case', "."),
              required: true
            });

          case 5:
            _ref2 = _context.sent;
            namePrompt = _ref2.namePrompt;
            name = namePrompt;

          case 8:
            if (!config.type.includes('react')) {
              _context.next = 12;
              break;
            }

            if (config.type !== 'react-next') {
              (0, _generateReactComponent["default"])(projectRoot, config, 'page', name);
            } else {
              (0, _output["default"])('Nothing happened! In NextJS please add new pages that manually, by creating a file in "/pages" directory.');
            }

            _context.next = 34;
            break;

          case 12:
            _context.next = 14;
            return (0, _getFronthackPath["default"])();

          case 14:
            fronthackPath = _context.sent;

            if (!(config.type === 'static')) {
              _context.next = 24;
              break;
            }

            _context.next = 18;
            return afs.readFile("".concat(fronthackPath, "/templates/page.html"), 'utf8');

          case 18:
            content = _context.sent;
            _context.next = 21;
            return afs.writeFile("".concat(projectRoot, "/src/").concat(name, ".html"), content);

          case 21:
            (0, _output["default"])('Done!');
            _context.next = 34;
            break;

          case 24:
            if (!(config.type === 'jekyll')) {
              _context.next = 33;
              break;
            }

            _context.next = 27;
            return afs.readFile("".concat(fronthackPath, "/templates/jekyll-suite/index.markdown"), 'utf8');

          case 27:
            _content = _context.sent;
            _context.next = 30;
            return afs.writeFile("".concat(projectRoot).concat(config.src, "/").concat(name, ".markdown"), _content);

          case 30:
            (0, _output["default"])('Done!');
            _context.next = 34;
            break;

          case 33:
            (0, _output["default"])("Error! Wrong action for the project of type \"".concat(config.type, "\"."));

          case 34:
            _context.next = 39;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 36]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;