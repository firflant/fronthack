"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.ends-with");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _prompt = _interopRequireDefault(require("prompt"));

var _imageSize = _interopRequireDefault(require("image-size"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(projectRoot, projectType) {
    var projectSrc, pageFiles, html, designFiles, design, _ref2, htmlIndex, designIndex, selectedHtml, selectedHtmlName, selectedDesign, path, data, dimensions, newData;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log('projectType: ', projectType); // Load list of avaliable html pages and prepare prompt data.

            projectSrc = "".concat(projectRoot).concat(projectType === 'jekyll' ? '' : '/src');
            _context.next = 5;
            return afs.readdir(projectSrc);

          case 5:
            pageFiles = _context.sent;
            html = {
              files: pageFiles.filter(function (n) {
                return n.includes('.html') || n.includes('.md');
              }),
              description: 'For which page you would like attach design to?\n',
              patternArray: []
            };
            html.files.map(function (file, i) {
              html.description = "".concat(html.description).concat(i, ": ").concat(file, "\n");
              html.patternArray.push(i);
            });
            html.pattern = new RegExp(html.patternArray.join('|'));
            html.description = "".concat(html.description, "Select number from the list above"); // Load list of avaliable design files

            _context.next = 12;
            return afs.readdir("".concat(projectSrc, "/designs"));

          case 12:
            designFiles = _context.sent;
            design = {
              files: designFiles.filter(function (n) {
                return n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png');
              }),
              description: 'Which design you would like to apply to this page?\n',
              patternArray: []
            };
            design.files.map(function (file, i) {
              design.description = "".concat(design.description).concat(i, ": ").concat(file, "\n");
              design.patternArray.push(i);
            });
            design.pattern = new RegExp(design.patternArray.join('|'));
            design.description = "".concat(design.description, "Select number from the list above"); // Collect variables.

            _prompt["default"].start();

            _context.next = 20;
            return (0, _userInput["default"])([{
              name: 'htmlIndex',
              description: html.description,
              type: 'string',
              pattern: html.pattern,
              message: 'It must be a number from the list',
              required: true
            }, {
              name: 'designIndex',
              description: design.description,
              type: 'string',
              pattern: design.pattern,
              message: 'It must be a number from the list',
              required: true
            }]);

          case 20:
            _ref2 = _context.sent;
            htmlIndex = _ref2.htmlIndex;
            designIndex = _ref2.designIndex;
            selectedHtml = html.files[htmlIndex];
            selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, "");
            selectedDesign = design.files[designIndex]; // Apply new design as a background CSS property

            path = "".concat(projectSrc, "/designs/connect-designs.css");
            _context.next = 29;
            return _fsExtra["default"].ensureFileSync(path);

          case 29:
            _context.next = 31;
            return afs.readFile(path, 'utf8');

          case 31:
            data = _context.sent;
            dimensions = (0, _imageSize["default"])("".concat(projectSrc, "/designs/").concat(selectedDesign)); // If width is bigger than 2000px, that means that it is doublesize.

            if (dimensions.width >= 2000) {
              dimensions.width = dimensions.width / 2;
            }

            newData = "".concat(data, ".show-designs .designs--").concat(selectedHtmlName, ", .show-code-designs .designs--").concat(selectedHtmlName, " { background-image: url('../designs/").concat(selectedDesign, "'); width: ").concat(dimensions.width, "px; margin: 0 ").concat(dimensions.width / -2, "px; }\n");
            _context.next = 37;
            return afs.writeFile(path, newData);

          case 37:
            // Display output.
            console.log("Done! ".concat(selectedDesign, " attached to ").concat(selectedHtml, " page."));
            _context.next = 43;
            break;

          case 40:
            _context.prev = 40;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 40]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;