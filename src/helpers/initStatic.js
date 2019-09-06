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
        default: 'fronthack-static'
      })
      name = namePrompt
    }
    if (name === 'fronthack') throw new Error('Name should be different than fronthack')
    const projectRoot = `${process.cwd()}/${name}`
    const fronthackPath = await getFronthackPath()

    // Copy static-repo file tree from template.
    await copy(`${fronthackPath}/templates/static-repo`, projectRoot, { dot: true })

    // Add fronthack configuration file.
    const config = await saveConfigFile(fronthackPath, projectRoot, 'static')

    // Add Sass Lint configuration file.
    const sassLintRc = await afs.readFile(`${fronthackPath}/templates/.sasslintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.sasslintrc`, sassLintRc)

    // Add HTMLHint  configuration file.
    const htmlHintRc = await afs.readFile(`${fronthackPath}/templates/.htmlhintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.htmlhintrc`, htmlHintRc)

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/src/designs`)
    const content = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/src/designs/README.md`, content)

    // .gitignore is named .gitignore_template to not be ignored during the insstalation.
    await fs.renameSync(`${projectRoot}/.gitignore_template`, `${projectRoot}/.gitignore`)

    // Install dependencies.
    await shell.cd(projectRoot)
    output('Installing node dependencies...')
    await shell.exec('yarn install')

    // Download global styles.
    await fetchComponent(projectRoot, config, 'style')

    // Do initial git commit.
    await shell.exec('git init')
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Repository initiated by fronthack init command"', { silent: true })

    // Output success messages.
    output('Fronthack project with Static HTML + ECMAScript features is ready for hacking!\nBegin by typing:')
    output('')
    output(`  cd ${name}\n  yarn start`)
    output('')
  } catch (err) {
    throw new Error(err)
  }
}