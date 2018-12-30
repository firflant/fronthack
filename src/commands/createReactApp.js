import prompt from 'prompt'
import shell from 'shelljs'
import * as afs from 'async-file'
import fs from 'fs-extra'

import getFronthackPath from '../helpers/getFronthackPath'
import consoleColors from '../helpers/consoleColors'
import fetchComponent from '../helpers/fetchComponent'
import regex from '../helpers/regex'
import userInput from '../helpers/userInput'


export default async () => {
  try {
    // Collect variables.
    prompt.start()
    const { name } = await userInput({
      name: 'name',
      description: 'Directory of installation',
      type: 'string',
      pattern: regex.projectName,
      message: 'Name must be only letters, numbers dashes or underscores',
      default: 'fronthack-react'
    })
    const fronthackPath = await getFronthackPath()

    // Display output.
    console.log(consoleColors.fronthack, 'Creating React app with Fronthack utilities...')
    console.log(consoleColors.fronthack, 'This command is a wrapper of the "Create React App" project.')
    console.log('')
    console.log(consoleColors.fronthack, 'Fronhack philosophy is to generate and hack - automate boilerplate, expose everything for developer, leave nothing under the hood.')
    console.log('')

    // Create React app.
    await shell.exec(`npx create-react-app ${name}`)
    await shell.cd(name)
    const currentPath = process.cwd()

    // Install additional dependencies.
    await shell.exec('yarn add copy-webpack-plugin node-sass bem-modifiers', { silent: true })
    await shell.exec('yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-standard', {  silent: true })
    await shell.exec('git add . && git commit -m "Added fronthack dependencies"', { silent: true })

    // Eject webpack config.
    await shell.exec('echo y | yarn eject')

    // Apply changes in App.js file.
    const content = await afs.readFile(`${currentPath}/src/App.js`, 'utf8')
    const newContent = content.replace('./App.css', './style/index.sass')
    await afs.writeFile(`${currentPath}/src/App.js`, newContent)

    // Apply changes in index.js file.
    const scriptsImportTemplate = await afs.readFile(`${fronthackPath}/templates/fronthack-scripts-import.js`, 'utf8')
    const indexContent = await afs.readFile(`${currentPath}/src/index.js`, 'utf8')
    const newIndexContent = indexContent
      .replace("import './index.css';\n", '')
      .concat(scriptsImportTemplate)
    await afs.writeFile(`${currentPath}/src/index.js`, newIndexContent)

    // Attach eslint config.
    const eslintContent = await afs.readFile(`${fronthackPath}/templates/.eslintrc`, 'utf8')
    await afs.writeFile(`${currentPath}/.eslintrc`, eslintContent)

    // Remove files that are not required anymore.
    await fs.unlinkSync(`${currentPath}/src/index.css`)
    await fs.unlinkSync(`${currentPath}/src/App.css`)

    // Inject Fronthack development tools to a Webpack config.
    const WebpackFronthackScripts = await afs.readFile(`${fronthackPath}/templates/webpack.config.fronthack-scripts.js`, 'utf8')
    const webpackConfContent = await afs.readFile(`${currentPath}/config/webpack.config.js`, 'utf8')
    const newWebpackConfContent = webpackConfContent
      .replace("require('webpack');", "require('webpack');\nconst CopyWebpackPlugin = require('copy-webpack-plugin');")
      .replace('WatchMissingNodeModulesPlugin(paths.appNodeModules),', `WatchMissingNodeModulesPlugin(paths.appNodeModules),\n${WebpackFronthackScripts}`)
    await afs.writeFile(`${currentPath}/config/webpack.config.js`, newWebpackConfContent)

    // Prepare designs directory.
    await fs.ensureDirSync(`${currentPath}/designs`)
    const readmeContent = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${currentPath}/designs/README.md`, readmeContent)

    // Fetch base styles.
    await fetchComponent(currentPath, true, false, 'style', null)

    // Do initial git commit.
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Added fronthack stuff"', { silent: true})

    // Display output.
    console.log(consoleColors.fronthack, 'Opinionated Fronthack React project is ready for hacking! Begin by typing:')
    console.log('')
    console.log(consoleColors.fronthack, `  cd ${name}`)
    console.log(consoleColors.fronthack, '  yarn start')
    console.log('')
  } catch (err) {
    throw new Error(err)
  }
}
