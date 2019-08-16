"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var afs = _interopRequireWildcard(require("async-file"));

var _consoleColors = _interopRequireDefault(require("./consoleColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Checks whether current dir is a React project.
 * @argument {string} projectRoot root path of the current project
 */
var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(projectRoot) {
    var content, _content, _content2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return afs.readFile("".concat(projectRoot, "/package.json"), 'utf8');

          case 3:
            content = _context.sent;

            if (!content.includes('\"react\": \"')) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return afs.readFile("".concat(projectRoot, "/package.json"), 'utf8');

          case 7:
            _content = _context.sent;
            return _context.abrupt("return", _content.includes('\"next\": \"') ? 'react-next' : 'react');

          case 11:
            if (!content.includes('\"fronthack-scripts\"')) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", 'static');

          case 13:
            _context.next = 24;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            _context.next = 19;
            return afs.readFile("".concat(projectRoot, "/Gemfile"), 'utf8');

          case 19:
            _content2 = _context.sent;

            if (!_content2.includes('jekyll')) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", 'jekyll');

          case 22:
            console.log(_consoleColors["default"].error, 'You are not in a scope of Fronthack project.');
            throw true;

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;