"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prompt = _interopRequireDefault(require("prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(property) {
  return new Promise(function (resolve, reject) {
    _prompt["default"].get(property, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports["default"] = _default;