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

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var projectRoot, config;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.t0 = command;
          _context2.next = _context2.t0 === 'init' ? 4 : _context2.t0 === 'component' ? 7 : _context2.t0 === 'page' ? 16 : _context2.t0 === 'design' ? 25 : _context2.t0 === 'list' ? 39 : _context2.t0 === 'help' ? 41 : _context2.t0 === 'version' ? 43 : 45;
          break;

        case 4:
          _context2.next = 6;
          return (0, _init["default"])(name);

        case 6:
          return _context2.abrupt("break", 47);

        case 7:
          _context2.next = 9;
          return defineProjectRoot();

        case 9:
          projectRoot = _context2.sent;
          _context2.next = 12;
          return (0, _readConfig["default"])(projectRoot);

        case 12:
          config = _context2.sent;
          _context2.next = 15;
          return (0, _component["default"])(projectRoot, config, name);

        case 15:
          return _context2.abrupt("break", 47);

        case 16:
          _context2.next = 18;
          return defineProjectRoot();

        case 18:
          projectRoot = _context2.sent;
          _context2.next = 21;
          return (0, _readConfig["default"])(projectRoot);

        case 21:
          config = _context2.sent;
          _context2.next = 24;
          return (0, _page["default"])(projectRoot, config, name);

        case 24:
          return _context2.abrupt("break", 47);

        case 25:
          _context2.next = 27;
          return defineProjectRoot();

        case 27:
          projectRoot = _context2.sent;
          _context2.next = 30;
          return (0, _readConfig["default"])(projectRoot);

        case 30:
          config = _context2.sent;

          if (!config.type.includes('react')) {
            _context2.next = 36;
            break;
          }

          _context2.next = 34;
          return (0, _reactDesign["default"])(projectRoot);

        case 34:
          _context2.next = 38;
          break;

        case 36:
          _context2.next = 38;
          return (0, _design["default"])(projectRoot, config);

        case 38:
          return _context2.abrupt("break", 47);

        case 39:
          (0, _list["default"])();
          return _context2.abrupt("break", 47);

        case 41:
          (0, _help["default"])();
          return _context2.abrupt("break", 47);

        case 43:
          (0, _version["default"])();
          return _context2.abrupt("break", 47);

        case 45:
          (0, _output["default"])('This is not a valid command. Type \'fronthack help\' for help.', 'warn');
          return _context2.abrupt("break", 47);

        case 47:
          _context2.next = 53;
          break;

        case 49:
          _context2.prev = 49;
          _context2.t1 = _context2["catch"](0);
          console.log('err: ', _context2.t1);
          (0, _output["default"])('Action cancelled.');

        case 53:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[0, 49]]);
}))();