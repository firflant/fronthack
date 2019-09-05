"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _openurl = _interopRequireDefault(require("openurl"));

var _output = _interopRequireDefault(require("../helpers/output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var url = 'https://docs.fronthack.com/?path=/story/components-basic-styles--default';
  (0, _output["default"])('');
  (0, _output["default"])('Browse a library of ready Fronthack components here:');
  (0, _output["default"])(url);
  (0, _output["default"])('');

  _openurl["default"].open(url);
};

exports["default"] = _default;