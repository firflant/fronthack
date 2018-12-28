'use strict';

var getUsage = require('command-line-usage');

module.exports = function () {
  var sections = [{
    header: 'Fronthack CLI',
    content: ['A generator tool for the Fronthack', '[underline]{http://fronthack.com}']
  }, {
    header: 'Generator commands',
    content: [{
      name: '[cyan]{fronthack init}',
      summary: 'create a new Fronthack project in current directory.'
    }, {
      name: '[cyan]{fronthack create-react-app}',
      summary: 'create new React project with Fronthack included'
    }, {
      name: '[cyan]{fronthack init-next}',
      summary: 'create new NextJS project with Fronthack included'
    }, {
      name: '[cyan]{fronthack component}',
      summary: 'generate new empty Sass component or receives the ready one if it exists in Fronthack\'s database.\n'
    }, {
      name: '[cyan]{fronthack layout}',
      summary: 'generate new empty Sass file for layout section.'
    }, {
      name: '[cyan]{fronthack page}',
      summary: 'generate new empty html page.'
    }, {
      name: '[cyan]{fronthack design}',
      summary: 'attach file with design to given page.'
    }, {
      name: '[cyan]{fronthack list}',
      summary: 'display list of ready components available in Fronthack repository.'
    }, {
      name: '[cyan]{fronthack help}',
      summary: 'display this help.'
    }, {
      name: '[cyan]{fronthack version}',
      summary: 'display currently installed version of Fronthack.'
    }]
  }, {
    content: 'These are only the generator commands usefull to generate new project and Sass files, but for development you need also the local scripts from below. They compile Sass and Mustache files into ready output, run local dev server etc.'
  }, {
    header: 'Static project scripts',
    content: [{
      name: '[cyan]{yarn start}',
      summary: 'run a local dev server with helpfull development scripts and livereload.'
    }, {
      name: '[cyan]{yarn build}',
      summary: 'compiles a standalone "dist" directory with minified files, which is ready to deploy to any production envirnoment.'
    }, {
      name: '[cyan]{yarn deploy}',
      summary: 'if your repository is hosted on GitHub, it deploys "dist" directory to Github pages.'
    }]
  }, {
    header: 'React project scripts',
    content: [{
      name: '[cyan]{yarn start}',
      summary: 'run a local dev server with helpfull development scripts.'
    }, {
      name: '[cyan]{yarn build}',
      summary: 'compiles a production build.'
    }, {
      summary: 'More at [underline]{https://github.com/facebook/create-react-app}'
    }]
  }, {
    content: ['You still need more help? Check the Fronthack docs: [underline]{http://docs.fronthack.com/}']
  }];
  var usage = getUsage(sections);
  console.log(usage);
};