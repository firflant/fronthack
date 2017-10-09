'use strict'
const commandLineCommands = require('command-line-commands')
const getUsage = require('command-line-usage')
const install = require('npm-install-package')
const fs = require('fs-extra')
const shell = require('shelljs/global')
const prompt = require('prompt')

const {consoleColors} = require('./console-colors')
const fetchSassTemplate = require('./fetch-sass-template')
const generateSassContent = require('./generate-sass-content')
const purgeStyleguide = require('./purge-styleguide')
const saveSass = require('./save-sass')
const githubGet = require('github-get')
Array.prototype.remove = require('remove-value')

const validCommands = [
  null,
  'init',
  'watch',
  'component',
  'layout',
  'list',
  'help'
]
const { command, argv } = commandLineCommands(validCommands)

switch (command) {
  case 'init':
    const initSchema = {
      properties: {
        name: {
          description: 'Directory of installation',
          type: 'string',
          pattern: /^[a-zA-Z\-\_]+$/,
          message: 'Name must be only letters, dashes or underscores',
          default: 'fronthack'
        }
      }
    }
    prompt.start()
    prompt.get(initSchema, function (err, result) {
      console.log(consoleColors.fronthack, 'Initiating Fronthack directory for new project...')
      console.log('')
      // Download Fronthack
      install(['fronthack-repo'], {}, function (err) {
        if (err) throw err
        console.log('Frontcraft package downloaded.')
        // Move from node_modules
        const currentPath = process.cwd()
        const fronthackPath = `${currentPath}/${result.name}`
        fs.move(`${currentPath}/node_modules/fronthack-repo`, fronthackPath, function (err) {
          if (err) throw err
          console.log('Package moved outside the node_modules directory.')
          fs.symlink('../src/designs', `${fronthackPath}/dist/designs`, function (err) {
            if (err) throw err
            // Delete node_modules if empty
            fs.emptyDir(`${currentPath}/node_modules`, function (err) {
              fs.remove(`${currentPath}/node_modules`, function (err) {
                if (err) throw err
                console.log('Empty node_modules directory removed.')
                // Go to new Fronthack directory
                cd(result.name)
                // Let .npmignore became .gitignore
                fs.move(`${fronthackPath}/.npmignore`, `${fronthackPath}/.gitignore`, function (err) {
                  if (err) throw err
                  // Remove all components except few
                  fs.readdir(`${fronthackPath}/src/sass/components`, function (err, files) {
                    if (err) throw err
                    // Remove from array elements that must stay.
                    files.remove('!TEMPLATE.sass').remove('README.md').remove('_btn.sass').remove('_icon.sass')
                    fs.readFile(`${fronthackPath}/src/sass/app.sass`, 'utf8', (err, data) => {
                      if (err) throw err
                      files.forEach(function (file) {
                        const name = file.replace('_', '').replace('.sass', '')
                        data = data.replace(`@import "components/${name}"\n`, '')
                        fs.remove(`${fronthackPath}/src/sass/components/${file}`, function (err) {
                          if (err) throw err
                        })
                      })
                      fs.writeFile(`${fronthackPath}/src/sass/app.sass`, data, (err) => {
                        if (err) throw err
                        console.log('Components cleanup done.')
                        // Purge styleguide
                        purgeStyleguide(fronthackPath, function (err) {
                          if (err) throw err
                          // Remove GitHub REARME file content and replace it with readme for existing projects.
                          fs.remove(`${fronthackPath}/README.md`, function (err) {
                            if (err) throw err
                            fs.move(`${fronthackPath}/readme-existing.md`, `${fronthackPath}/README.md`, function (err) {
                              if (err) throw err
                              // Download all dependencies
                              console.log('Installing project dependencies...')
                              if (exec('npm install').code !== 0) {
                                console.log('Installing dependencies failed')
                                exit(1)
                              }
                              console.log(consoleColors.fronthack, `Fronthack innitiated successfully at ${fronthackPath}`)
                              console.log(consoleColors.fronthack, 'You can now navigate to this path and run inside following commands:')
                              console.log(consoleColors.fronthack, '  $ npm run dev         - to watch for changes and run local dev server')
                              console.log(consoleColors.fronthack, '  $ npm run build       - to generate production-ready dist directory')
                              console.log(consoleColors.fronthack, '  $ fronthack component - to generate Sass for new BEM component')
                              console.log(consoleColors.fronthack, '  $ fronthack layout    - to generate Sass for layout section')
                              console.log(consoleColors.fronthack, '  $ fronthack help      - to get more help!')
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
    break


  case 'watch':
    console.log('')
    console.log(consoleColors.warning, 'Fronthack commandline interface is now only a generator tool. This is why "fronthack watch" command become deprecated.')
    console.log('')
    console.log(consoleColors.fronthack, 'Use "npm run dev" or "gulp dev" command instead.')
    console.log('')
    break


  case 'component':
    const componentSchema = {
      properties: {
        machinename: {
          description: 'Machine name of new component',
          type: 'string',
          pattern: /^[a-zA-Z\-]+$/,
          message: 'Name must be only letters or dashes',
          required: true
        },
        description: {
          description: 'It\'s short description',
          type: 'string',
        }
      }
    }
    prompt.start()
    prompt.get(componentSchema, function (err, result) {
      const filename = `_${result.machinename}.sass`
      generateSassContent(result.machinename, result.description, filename, function (err, content, filepath) {
        if (err) throw err
        saveSass(result.machinename, filepath, content, 'component')
      })
    })
    break


  case 'layout':
    const layoutSchema = {
      properties: {
        machinename: {
          description: 'Name of new section (ex. footer)',
          type: 'string',
          pattern: /^[a-zA-Z\-]+$/,
          message: 'Name must be only letters or dashes',
          required: true
        }
      }
    }
    prompt.start()
    prompt.get(layoutSchema, function (err, result) {
      const filename = `_layout-${result.machinename}.sass`
      const humanname = result.machinename.charAt(0).toUpperCase() + result.machinename.slice(1).replace('-', ' ')
      const filepath = `src/sass/layout/${filename}`
      const currentepath = process.cwd()
      if (fs.existsSync(`${currentepath}/${filepath}`)) {
        throw new Error (`Error: ${result.machinename} layout section already exists. Choose another name.`)
      }
      fetchSassTemplate(filepath, result.machinename, humanname, 'layout', null, function (err, content, filepath) {
        if (err) throw err
        saveSass(result.machinename, filepath, content, 'layout')
      })
    })
    break


  case 'list':
    console.log('')
    console.log('List of ready Fronthack components:')
    console.log('')
    githubGet('frontcraft/fronthack-repo', `src/sass/components`, function (err, files) {
      const unwanted = ['!TEMPLATE.sass', 'README.md', 'html']
      if (err) throw err
      files.forEach(function (file) {
        if (!unwanted.includes(file.name)) {
          console.log(file.name.replace('_', '- ').replace('.sass', ''))
        }
      })
      console.log('')
      console.log('Type \`fronthack component\` and enter its name to use any from list.')
    })
    break


  case 'help':
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
            summary: 'creates a new Fronthack project in current directory   '
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
            summary: 'watches for changes and run local dev server with a helpful development scripts'
          },
          {
            name: '[cyan]{npm run build}',
            summary: 'Compiles a standalone "dist" folder with compiled and minified files, which is ready to deploy to production envirnoment'
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
    break


  case null:
    console.log('You did not passed any operation. Type \'fronthack help\' for help.')
    break
}
