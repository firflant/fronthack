"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Colors for console output.
 */
var _default = {
  fronthack: '\x1b[36m%s\x1b[0m',
  green: '\x1b[32m',
  warning: '\x1b[33m%s\x1b[0m',
  error: '\x1b[31m'
};
exports["default"] = _default;