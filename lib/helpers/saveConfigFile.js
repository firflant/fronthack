"use strict";

require("core-js/modules/es.array.includes");

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

var _output = _interopRequireDefault(require("./output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(fronthackPath, projectRoot, type) {
    var fronthackJson, config, filledConfig;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return afs.readFile("".concat(fronthackPath, "/package.json"), 'utf8');

          case 3:
            fronthackJson = _context.sent;
            _context.next = 6;
            return afs.readFile("".concat(fronthackPath, "/templates/.fronthack"), 'utf8');

          case 6:
            config = _context.sent;
            filledConfig = config.replace('TYPE_UNDEFINED', type).replace('SRC_UNDEFINED', ['react', 'static'].includes(type) ? '/src' : type === 'hugo' ? '/assets' : '').replace('VERSION_UNDEFINED', JSON.parse(fronthackJson).version);
            _context.next = 10;
            return afs.writeFile("".concat(projectRoot, "/.fronthack"), filledConfig);

          case 10:
            return _context.abrupt("return", JSON.parse(filledConfig));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            (0, _output["default"])('Could not save the .fronthack configuration file.', 'error');
            throw true;

          case 17:
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