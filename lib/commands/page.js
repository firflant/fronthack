"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var afs = _interopRequireWildcard(require("async-file"));

var _prompt = _interopRequireDefault(require("prompt"));

var _getFronthackPath = _interopRequireDefault(require("../helpers/getFronthackPath"));

var _regex = _interopRequireDefault(require("../helpers/regex"));

var _generateReactComponent = _interopRequireDefault(require("../helpers/generateReactComponent"));

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
  regeneratorRuntime.mark(function _callee(projectRoot, isReact, isNext) {
    var _ref2, machinename, fronthackPath, content;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _prompt["default"].start();

            _context.next = 4;
            return (0, _userInput["default"])({
              name: 'machinename',
              description: 'Name of new page (ex. contact, articles, about )',
              type: 'string',
              pattern: isReact ? _regex["default"].pascalCase : _regex["default"].kebabCase,
              message: "Name must be in ".concat(isReact ? 'PascalCase' : 'kebab-case', "."),
              required: true
            });

          case 4:
            _ref2 = _context.sent;
            machinename = _ref2.machinename;

            if (!isReact) {
              _context.next = 10;
              break;
            }

            if (!isNext) {
              (0, _generateReactComponent["default"])(projectRoot, isNext, 'page', machinename);
            } else {
              console.log('Nothing happened! In NextJS please add new pages that manually, by creating a file in "/pages" directory.');
            }

            _context.next = 19;
            break;

          case 10:
            _context.next = 12;
            return (0, _getFronthackPath["default"])();

          case 12:
            fronthackPath = _context.sent;
            _context.next = 15;
            return afs.readFile("".concat(fronthackPath, "/templates/page.html"), 'utf8');

          case 15:
            content = _context.sent;
            _context.next = 18;
            return afs.writeFile("".concat(projectRoot, "/src/").concat(machinename, ".html"), content);

          case 18:
            console.log('Done!');

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;