import prompt from 'prompt'
import shell from 'shelljs'
import * as afs from 'async-file'
import fs from 'fs-extra'

import getFronthackPath from './getFronthackPath'
import output from './output'
import fetchComponent from './fetchComponent'
import regex from './regex'
import userInput from './userInput'
import saveConfigFile from './saveConfigFile'


export default async name => {
  try {
    // Collect variables.
    if (!name) {
      prompt.start()
      const { namePrompt } = await userInput({
        name: 'namePrompt',
        description: 'Directory of installation',
        type: 'string',
        pattern: regex.projectName,
        message: 'Name must be only letters, numbers dashes or underscores',
        default: 'fronthack-react'
      })
      name = namePrompt
    }
    const fronthackPath = await getFronthackPath()

    // Create React app.
    output('Running create-react-app command...')
    await shell.exec(`npx create-react-app ${name}`)
    await shell.cd(name)
    const projectRoot = process.cwd()

    // Eject webpack config.
    await shell.exec('git add -A && git commit -m "Created React app"', { silent: true })
    output('Customizing a project for Fronthack...')
    await shell.exec('echo y | yarn eject')

    // Install additional dependencies.
    output('Installing additional dependencies...')
    await shell.exec('yarn add @babel/plugin-transform-react-jsx-source copy-webpack-plugin node-sass bem-modifiers', { silent: true })
    // TODO: write own React boilerplate with correct dependency tree instead of using CRAP.
    await shell.exec('yarn add fronthack-scripts eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-standard sass-lint', {  silent: true })
    await shell.exec('git add . && git commit -m "Added fronthack dependencies"', { silent: true })

    // Add fronthack configuration file.
    const config = await saveConfigFile(fronthackPath, projectRoot, 'react')

    // Apply changes in App.js file.
    const content = await afs.readFile(`${projectRoot}/src/App.js`, 'utf8')
    const newContent = content.replace('./App.css', './style/index.sass')
    await afs.writeFile(`${projectRoot}/src/App.js`, newContent)

    // Apply changes in index.js file.
    const scriptsImportTemplate = await afs.readFile(`${fronthackPath}/templates/fronthack-scripts-import.js`, 'utf8')
    const indexContent = await afs.readFile(`${projectRoot}/src/index.js`, 'utf8')
    const newIndexContent = indexContent
      .replace("import './index.css';\n", '')
      .concat(scriptsImportTemplate)
    await afs.writeFile(`${projectRoot}/src/index.js`, newIndexContent)

    // Add Eslint configuration file.
    const eslintContent = await afs.readFile(`${fronthackPath}/templates/.eslintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.eslintrc`, eslintContent)

    // Add Sass Lint configuration file.
    const sassLintRc = await afs.readFile(`${fronthackPath}/templates/.sasslintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.sasslintrc`, sassLintRc)

    // Remove files that are not required anymore.
    await fs.unlinkSync(`${projectRoot}/src/index.css`)
    await fs.unlinkSync(`${projectRoot}/src/App.css`)

    // Inject Fronthack development tools to a Webpack config.
    const WebpackFronthackScripts = await afs.readFile(`${fronthackPath}/templates/webpack.config.fronthack-scripts.js`, 'utf8')
    const webpackConfContent = await afs.readFile(`${projectRoot}/config/webpack.config.js`, 'utf8')
    const newWebpackConfContent = webpackConfContent
      .replace("require('webpack');", "require('webpack');\nconst CopyWebpackPlugin = require('copy-webpack-plugin');")
      .replace('WatchMissingNodeModulesPlugin(paths.appNodeModules),', `WatchMissingNodeModulesPlugin(paths.appNodeModules),\n${WebpackFronthackScripts}`)
    await afs.writeFile(`${projectRoot}/config/webpack.config.js`, newWebpackConfContent)

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/designs`)
    const readmeContent = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/designs/README.md`, readmeContent)

    // Fetch base styles.
    await fetchComponent(projectRoot, config, 'style')

    // Fix all linting issues. Mainly semicolons and quotation marks.
    await shell.exec('npx eslint src --fix')

    // Do initial git commit.
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Added fronthack stuff"', { silent: true})

    // Display output.
    output('Fronthack React project is ready for hacking!\nBegin by typing:')
    output('')
    output(`  cd ${name}`)
    output('  yarn start')
    output('')
  } catch (err) {
    throw new Error(err)
  }
}
