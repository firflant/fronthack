"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _consoleColors = _interopRequireDefault(require("./consoleColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(message, type) {
  var color = type === 'error' ? _consoleColors["default"].error : type === 'warn' ? _consoleColors["default"].warning : _consoleColors["default"].fronthack;
  console.log(color, message);

  if (type === 'error') {
    console.log(_consoleColors["default"].error, 'Exiting.');
    process.exit(1);
  }
};

exports["default"] = _default;