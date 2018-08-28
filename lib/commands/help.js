'use strict'

const getUsage = require('command-line-usage')


module.exports = () => {
  const sections = [
    {
      header: 'Fronthack CLI',
      content: [
        'A generator tool for the Fronthack',
        '[underline]{http://fronthack.com}'
      ]
    },
    {
      header: 'Generator commands',
      content: [
        {
          name: '[cyan]{fronthack init}',
          summary: 'creates a new Fronthack project in current directory.'
        },
        {
          name: '[cyan]{fronthack component}',
          summary: 'generates new empty Sass component or receives the ready one if it exists in Fronthack\'s database.\n'
        },
        {
          name: '[cyan]{fronthack layout}',
          summary: 'generates new empty Sass file for layout section.'
        },
        {
          name: '[cyan]{fronthack page}',
          summary: 'generates new empty html page.'
        },
        {
          name: '[cyan]{fronthack design}',
          summary: 'attach file with design to given page.'
        },
        {
          name: '[cyan]{fronthack list}',
          summary: 'displays list of ready components available in Fronthack database.'
        },
        {
          name: '[cyan]{fronthack help}',
          summary: 'displays this help.'
        }
      ]
    },
    {
      content: 'These are only the generator commands usefull to generate new project and Sass files, but for development you need also the local scripts from below. They compile Sass and Mustache files into ready output, run local dev server etc.'
    },
    {
      header: 'Project scripts',
      content: [
        {
          name: '[cyan]{npm run dev}',
          summary: 'run a local dev server with helpfull development scripts and livereload.'
        },
        {
          name: '[cyan]{npm run build}',
          summary: 'compiles a standalone "dist" directory with minified files, which is ready to deploy to any production envirnoment.'
        },
        {
          name: '[cyan]{npm run deploy}',
          summary: 'if your repository is hosted on GitHub, it deploys "dist" directory to Github pages.'
        }
      ]
    },
    {
      content: [
        'You still need more help? Visit Fronthack\'s wiki:',
        '[underline]{https://github.com/frontcraft/fronthack-repo/wiki/1.-How-to-work-with-Fronthack}'
      ]
    }
  ]
  const usage = getUsage(sections)
  console.log(usage)
}