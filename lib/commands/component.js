"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _prompt = _interopRequireDefault(require("prompt"));

var _case = _interopRequireDefault(require("case"));

var _fetchComponent = _interopRequireDefault(require("../helpers/fetchComponent"));

var _regex = _interopRequireDefault(require("../helpers/regex"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(projectRoot, projectType, name) {
    var _ref2, namePrompt, parsedName;

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
              description: 'Machine name of a new component',
              type: 'string',
              pattern: _regex["default"].validName,
              message: 'It must contain only alphanumeric characters, dashes, underscores or slashes.',
              required: true
            });

          case 5:
            _ref2 = _context.sent;
            namePrompt = _ref2.namePrompt;
            name = namePrompt;

          case 8:
            parsedName = projectType.includes('react') ? _case["default"].pascal(name) : _case["default"].kebab(name);
            _context.next = 11;
            return (0, _fetchComponent["default"])(projectRoot, projectType, parsedName);

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;