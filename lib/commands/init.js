"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _prompt = _interopRequireDefault(require("prompt"));

var _initStatic = _interopRequireDefault(require("../helpers/initStatic"));

var _initJekyll = _interopRequireDefault(require("../helpers/initJekyll"));

var _initReact = _interopRequireDefault(require("../helpers/initReact"));

var _initNext = _interopRequireDefault(require("../helpers/initNext"));

var _initHugo = _interopRequireDefault(require("../helpers/initHugo"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

var _output = _interopRequireDefault(require("../helpers/output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(nameParam) {
    var _ref2, technology;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // Collect variables.
            _prompt["default"].start();

            _context.next = 4;
            return (0, _userInput["default"])({
              name: 'technology',
              description: 'Pick a technology:\n1. Basic static site\n2. Jekyll\n3. React\n4. Next.js\n5. Hugo\n',
              type: 'number',
              pattern: '1|2|3|4|5',
              message: 'Select one from numbers above.'
            });

          case 4:
            _ref2 = _context.sent;
            technology = _ref2.technology;
            _context.t0 = technology;
            _context.next = _context.t0 === 1 ? 9 : _context.t0 === 2 ? 12 : _context.t0 === 3 ? 15 : _context.t0 === 4 ? 18 : _context.t0 === 5 ? 21 : 24;
            break;

          case 9:
            (0, _output["default"])('Initializing a static site on Gulp with Fronthack boilerplate...');
            (0, _initStatic["default"])(nameParam);
            return _context.abrupt("break", 26);

          case 12:
            (0, _output["default"])('Initializing a static site on Jekyll with Fronthack boilerplate...');
            (0, _initJekyll["default"])(nameParam);
            return _context.abrupt("break", 26);

          case 15:
            (0, _output["default"])('Initializing a React app with Fronthack boilerplate...');
            (0, _initReact["default"])(nameParam);
            return _context.abrupt("break", 26);

          case 18:
            (0, _output["default"])('Initializing a Next.js app with Fronthack boilerplate...');
            (0, _initNext["default"])(nameParam);
            return _context.abrupt("break", 26);

          case 21:
            (0, _output["default"])('Initializing a static site on Hugo with Fronthack boilerplate...');
            (0, _initHugo["default"])(nameParam);
            return _context.abrupt("break", 26);

          case 24:
            (0, _output["default"])('Select one from the numbers above.', 'warn');
            return _context.abrupt("break", 26);

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t1 = _context["catch"](0);
            throw new Error(_context.t1);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 28]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;