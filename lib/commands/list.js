"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _openurl = _interopRequireDefault(require("openurl"));

var _consoleColors = _interopRequireDefault(require("../helpers/consoleColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  var url = 'https://frontcraft.github.io/fronthack-components';
  console.log('');
  console.log(_consoleColors.default.fronthack, 'Browse a library of ready Fronthack components here:');
  console.log(_consoleColors.default.fronthack, url);
  console.log('');

  _openurl.default.open(url);
};

exports.default = _default;