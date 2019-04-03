"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prompt = _interopRequireDefault(require("prompt"));

var _initStatic = _interopRequireDefault(require("../helpers/initStatic"));

var _initReact = _interopRequireDefault(require("../helpers/initReact"));

var _initNext = _interopRequireDefault(require("../helpers/initNext"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

var _consoleColors = _interopRequireDefault(require("../helpers/consoleColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
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
            description: 'Pick a technology:\n1. Static HTML+jQuery run by Gulp\n2. React run by Webpack\n3. Next.js run by Webpack\n',
            type: 'number',
            pattern: '1|2|3',
            message: 'Select one from numbers above.'
          });

        case 4:
          _ref2 = _context.sent;
          technology = _ref2.technology;
          _context.t0 = technology;
          _context.next = _context.t0 === 1 ? 9 : _context.t0 === 2 ? 12 : _context.t0 === 3 ? 15 : 18;
          break;

        case 9:
          console.log(_consoleColors["default"].fronthack, 'Initializing a Static HTML project with Fronthack boilerplate...');
          (0, _initStatic["default"])();
          return _context.abrupt("break", 20);

        case 12:
          console.log(_consoleColors["default"].fronthack, 'Initializing a React app with Fronthack boilerplate...');
          (0, _initReact["default"])();
          return _context.abrupt("break", 20);

        case 15:
          console.log(_consoleColors["default"].fronthack, 'Initializing a Next.js app with Fronthack boilerplate...');
          (0, _initNext["default"])();
          return _context.abrupt("break", 20);

        case 18:
          console.log(_consoleColors["default"].error, 'Select one from numbers above.');
          return _context.abrupt("break", 20);

        case 20:
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t1 = _context["catch"](0);
          throw new Error(_context.t1);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 22]]);
}));

exports["default"] = _default;