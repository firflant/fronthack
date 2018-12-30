"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var afs = _interopRequireWildcard(require("async-file"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _prompt = _interopRequireDefault(require("prompt"));

var _imageSize = _interopRequireDefault(require("image-size"));

var _regex = _interopRequireDefault(require("../helpers/regex"));

var _userInput = _interopRequireDefault(require("../helpers/userInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(projectRoot) {
    var files, design, _ref2, designIndex, url, selectedHtml, selectedHtmlName, selectedDesign, devCss, data, dimensions, newData;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return afs.readdir("".concat(projectRoot, "/designs"));

          case 3:
            files = _context.sent;
            design = {
              files: files.filter(function (n) {
                return n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png') || n.endsWith('.svg');
              }),
              description: 'Which design you would like to pair with a page?\n',
              patternArray: []
            };
            design.files.map(function (file, i) {
              design.description = "".concat(design.description).concat(i, ": ").concat(file, "\n");
              design.patternArray.push(i);
            });
            design.pattern = new RegExp(design.patternArray.join('|'));
            design.description = "".concat(design.description, "Select number from the list above"); // Collect variables.

            _prompt.default.start();

            _context.next = 11;
            return (0, _userInput.default)([{
              name: 'designIndex',
              description: design.description,
              type: 'string',
              pattern: design.pattern,
              message: 'It must be a number from the list',
              required: true
            }, {
              name: 'url',
              description: 'Enter the url of the page you want to pair (example: "company/about-us"). Enter "index" for the base url path.\n',
              type: 'string',
              pattern: _regex.default.pageUrl,
              message: 'It must contain only alphanumeric characters, dashes, underscores or slashes.',
              required: true
            }]);

          case 11:
            _ref2 = _context.sent;
            designIndex = _ref2.designIndex;
            url = _ref2.url;
            selectedHtml = url;
            selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, '').replace(/[\/\\]+$/, '-');
            selectedDesign = design.files[designIndex]; // Apply new design as a background CSS property

            devCss = "".concat(projectRoot, "/designs/connect-designs.css");
            _context.next = 20;
            return _fsExtra.default.ensureFileSync(devCss);

          case 20:
            _context.next = 22;
            return afs.readFile(devCss, 'utf8');

          case 22:
            data = _context.sent;
            dimensions = (0, _imageSize.default)("".concat(projectRoot, "/designs/").concat(selectedDesign)); // If width is bigger than 2000px, that means that it is doublesize.

            if (dimensions.width >= 2000) {
              dimensions.width = dimensions.width / 2;
            }

            newData = "".concat(data, ".show-designs .designs--").concat(selectedHtmlName, ", .show-code-designs .designs--").concat(selectedHtmlName, " { background-image: url('../designs/").concat(selectedDesign, "'); width: ").concat(dimensions.width, "px; margin: 0 ").concat(dimensions.width / -2, "px; }\n");
            _context.next = 28;
            return afs.writeFile(devCss, newData);

          case 28:
            // Display output.
            console.log("Done! ".concat(selectedDesign, " attached to ").concat(selectedHtml, " page."));
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 31]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;