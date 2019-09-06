import * as afs from 'async-file'
import fs from 'fs-extra'
import prompt from 'prompt'
import shell from 'shelljs'
import copy from 'recursive-copy'
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
        default: 'fronthack-next'
      })
      name = namePrompt
    }
    if (name === 'fronthack') throw new Error('Name should be different than fronthack')
    const projectRoot = `${process.cwd()}/${name}`
    const fronthackPath = await getFronthackPath()

    // Copy static-repo file tree template
    await copy(`${fronthackPath}/templates/next-repo`, projectRoot, { dot: true })
    await shell.cd(projectRoot)

    // Add fronthack configuration file.
    const config = await saveConfigFile(fronthackPath, projectRoot, 'react-next')

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/designs`)
    const readmeContent = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/designs/README.md`, readmeContent)

    // .gitignore is named .gitignore_template to not be ignored during the insstalation.
    await fs.renameSync(`${projectRoot}/.gitignore_template`, `${projectRoot}/.gitignore`)

    // Install dependencies
    output('Installing node dependencies...')
    await shell.exec('yarn install && yarn add --dev fronthack-scripts eslint babel-eslint eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard sass-lint', { silent: false })

    // Inject Fronthack development tools to a Webpack config.
    const scriptsImportTemplate = await afs.readFile(`${fronthackPath}/templates/fronthack-scripts-import.js`, 'utf8')
    const appContent = await afs.readFile(`${projectRoot}/pages/_app.js`, 'utf8')
    const newAppContent = appContent
      .replace('  render () {', `  componentDidMount() {${scriptsImportTemplate}\n  }\n\n  render () {`)
    await afs.writeFile(`${projectRoot}/pages/_app.js`, newAppContent)

    // Add Eslint configuration file.
    const eslintContent = await afs.readFile(`${fronthackPath}/templates/.eslintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.eslintrc`, eslintContent)

    // Add Sass Lint configuration file.
    const sassLintRc = await afs.readFile(`${fronthackPath}/templates/.sasslintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.sasslintrc`, sassLintRc)

    // Fetch base styles.
    await fetchComponent(projectRoot, config, 'style')

    // Do initial git commit.
    await shell.exec('git init')
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Repository initiated by fronthack"', { silent: true})

    // Display output.
    output('Fronthack React project with Next.js features is ready for hacking!\nBegin by typing:')
    output('')
    output(`  cd ${name}`)
    output('  yarn dev')
    output('')
  } catch (err) {
    throw new Error(err)
  }
}