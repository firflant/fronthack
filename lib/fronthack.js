"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.replace");

require("regenerator-runtime/runtime");

var _commandLineCommands2 = _interopRequireDefault(require("command-line-commands"));

var _findUp = _interopRequireDefault(require("find-up"));

var _init = _interopRequireDefault(require("./commands/init"));

var _component = _interopRequireDefault(require("./commands/component"));

var _page = _interopRequireDefault(require("./commands/page"));

var _design = _interopRequireDefault(require("./commands/design"));

var _reactDesign = _interopRequireDefault(require("./commands/reactDesign"));

var _list = _interopRequireDefault(require("./commands/list"));

var _help = _interopRequireDefault(require("./commands/help"));

var _version = _interopRequireDefault(require("./commands/version"));

var _readConfig = _interopRequireDefault(require("./helpers/readConfig"));

var _output = _interopRequireDefault(require("./helpers/output"));

require("core-js/stable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validCommands = [null, 'init', 'component', 'page', 'design', 'list', 'help', 'version'];

var _commandLineCommands = (0, _commandLineCommands2["default"])(validCommands),
    command = _commandLineCommands.command,
    argv = _commandLineCommands.argv; // Tread first param as a name.


var name = argv.length ? argv[0] : null;
/**
 * Defines root path of the project
 */

var defineProjectRoot =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var packagePath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _findUp["default"].sync(['Gemfile', 'package.json']);

          case 3:
            packagePath = _context.sent;

            if (!packagePath) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", packagePath.replace('/package.json', '').replace('/Gemfile', ''));

          case 8:
            throw true;

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            (0, _output["default"])('You are not in a scope of Fronthack project.', 'error');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function defineProjectRoot() {
    return _ref.apply(this, arguments);
  };
}();

var runCommands =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var projectRoot, config;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = command;
            _context2.next = _context2.t0 === 'init' ? 3 : _context2.t0 === 'component' ? 5 : _context2.t0 === 'page' ? 13 : _context2.t0 === 'design' ? 21 : _context2.t0 === 'list' ? 29 : _context2.t0 === 'help' ? 31 : _context2.t0 === 'version' ? 33 : 35;
            break;

          case 3:
            (0, _init["default"])(name);
            return _context2.abrupt("break", 37);

          case 5:
            _context2.next = 7;
            return defineProjectRoot();

          case 7:
            projectRoot = _context2.sent;
            _context2.next = 10;
            return (0, _readConfig["default"])(projectRoot);

          case 10:
            config = _context2.sent;
            (0, _component["default"])(projectRoot, config, name);
            return _context2.abrupt("break", 37);

          case 13:
            _context2.next = 15;
            return defineProjectRoot();

          case 15:
            projectRoot = _context2.sent;
            _context2.next = 18;
            return (0, _readConfig["default"])(projectRoot);

          case 18:
            config = _context2.sent;
            (0, _page["default"])(projectRoot, config, name);
            return _context2.abrupt("break", 37);

          case 21:
            _context2.next = 23;
            return defineProjectRoot();

          case 23:
            projectRoot = _context2.sent;
            _context2.next = 26;
            return (0, _readConfig["default"])(projectRoot);

          case 26:
            config = _context2.sent;

            if (config.type.includes('react')) {
              (0, _reactDesign["default"])(projectRoot);
            } else {
              (0, _design["default"])(projectRoot, config);
            }

            return _context2.abrupt("break", 37);

          case 29:
            (0, _list["default"])();
            return _context2.abrupt("break", 37);

          case 31:
            (0, _help["default"])();
            return _context2.abrupt("break", 37);

          case 33:
            (0, _version["default"])();
            return _context2.abrupt("break", 37);

          case 35:
            (0, _output["default"])('This is not a valid command. Type \'fronthack help\' for help.', 'warn');
            return _context2.abrupt("break", 37);

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function runCommands() {
    return _ref2.apply(this, arguments);
  };
}();

runCommands();