"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var sections = [{
    header: 'Fronthack CLI',
    content: ['A generator tool for the Fronthack projects', '[underline]{http://fronthack.com}']
  }, {
    header: 'Generator commands',
    content: [{
      name: '[cyan]{fronthack init}',
      summary: 'Initiate a new Fronthack project in picked technology.'
    }, {
      name: '[cyan]{fronthack component}',
      summary: 'Generate a new blank component or fetch the exists one of that name from Fronthack repository.'
    }, {
      name: '[cyan]{fronthack page}',
      summary: 'Generate a new page.'
    }, {
      name: '[cyan]{fronthack design}',
      summary: 'Pair design file with given page.'
    }, {
      name: '[cyan]{fronthack list}',
      summary: 'Display a list of components available in Fronthack repository.'
    }, {
      name: '[cyan]{fronthack help}',
      summary: 'Display this help.'
    }, {
      name: '[cyan]{fronthack version}',
      summary: 'Display currently installed version of Fronthack.'
    }]
  }, {
    header: 'Static HTML project scripts',
    content: [{
      name: '[cyan]{yarn start}',
      summary: 'Run a local dev server with helpfull development scripts and livereload.'
    }, {
      name: '[cyan]{yarn build}',
      summary: 'Compiles a standalone "dist" directory with minified files, that are ready to deploy.'
    }, {
      name: '[cyan]{yarn deploy}',
      summary: 'If your repository is hosted on GitHub, it deploys compiled "dist" directory to GitHub pages.'
    }]
  }, {
    header: 'React project scripts',
    content: [{
      name: '[cyan]{yarn start}',
      summary: 'Run a local dev server.'
    }, {
      name: '[cyan]{yarn build}',
      summary: 'Compiles a production build.'
    }, {
      summary: 'More at [underline]{https://github.com/facebook/create-react-app}'
    }]
  }, {
    header: 'Next.js project scripts',
    content: [{
      name: '[cyan]{yarn dev}',
      summary: 'Run a local dev server.'
    }, {
      name: '[cyan]{yarn build}',
      summary: 'Compiles a production build.'
    }, {
      name: '[cyan]{yarn start}',
      summary: 'Starts a production build.'
    }]
  }, {
    content: ['You still need more help? Check out the official Fronthack docs:\n[underline]{https://frontcraft.github.io/fronthack-components/index.html?selectedKind=Docs%2FIntroduction&selectedStory=default}']
  }];
  var usage = (0, _commandLineUsage["default"])(sections);
  console.log(usage);
};

exports["default"] = _default;