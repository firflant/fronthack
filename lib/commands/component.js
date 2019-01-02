"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prompt = _interopRequireDefault(require("prompt"));

var _fetchComponent = _interopRequireDefault(require("../helpers/fetchComponent"));

var _regex = _interopRequireDefault(require("../helpers/regex"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(projectRoot, isReact, isNext) {
    var _ref2, machinename;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _prompt.default.start();

            _context.next = 4;
            return (0, _userInput.default)([{
              name: 'machinename',
              description: 'Machine name of a new component',
              type: 'string',
              pattern: isReact ? _regex.default.pascalCase : _regex.default.kebabCase,
              message: "Name of the ".concat(isReact ? 'react ' : '', "component must be in ").concat(isReact ? 'PascalCase' : 'kebab-case', "."),
              required: true
            }]);

          case 4:
            _ref2 = _context.sent;
            machinename = _ref2.machinename;
            _context.next = 8;
            return (0, _fetchComponent.default)(projectRoot, isReact, isNext, machinename);

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;