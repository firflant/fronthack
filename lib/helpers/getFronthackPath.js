"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var fs = _interopRequireWildcard(require("async-file"));

var _yarnGlobalModules = _interopRequireDefault(require("yarn-global-modules"));

var _globalModules = _interopRequireDefault(require("global-modules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var yarnPath, npmPath;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          yarnPath = "".concat((0, _yarnGlobalModules.default)(), "/node_modules/fronthack");
          _context.next = 4;
          return fs.readdir(yarnPath, 'utf8');

        case 4:
          return _context.abrupt("return", yarnPath);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          _context.prev = 9;
          npmPath = "".concat(_globalModules.default, "/fronthack");
          _context.next = 13;
          return fs.readdir(npmPath, 'utf8');

        case 13:
          return _context.abrupt("return", npmPath);

        case 16:
          _context.prev = 16;
          _context.t1 = _context["catch"](9);
          throw new Error(_context.t1);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 7], [9, 16]]);
}));

exports.default = _default;