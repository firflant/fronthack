import * as afs from 'async-file'
import fs from 'fs-extra'
import prompt from 'prompt'
import shell from 'shelljs'
import copy from 'recursive-copy'
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
      default: 'fronthack-static'
    })
    if (name === 'fronthack') throw new Error('Name should be different than fronthack')
    console.log(consoleColors.fronthack, 'Initiating Fronthack directory for new project...')
    const projectRoot = `${process.cwd()}/${name}`
    const fronthackPath = await getFronthackPath()

    // Copy static-repo file tree from template.
    await copy(`${fronthackPath}/templates/static-repo`, projectRoot, { dot: true })

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/src/designs`)
    const content = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/src/designs/README.md`, content)

    // .gitignore is named .gitignore_template to not be ignored during the insstalation.
    await fs.renameSync(`${projectRoot}/.gitignore_template`, `${projectRoot}/.gitignore`)

    await shell.cd(projectRoot)

    // Install dependencies.
    console.log(consoleColors.fronthack, 'Installing node dependencies...')
    await shell.exec('yarn install')

    // Download global styles.
    await fetchComponent(projectRoot, false, false, 'style', null)

    // Do initial git commit.
    await shell.exec('git init')
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Repository initiated by fronthack init command"', { silent: true })

    // Output success messages.
    console.log(consoleColors.fronthack, `Fronthack innitiated successfully at ${projectRoot}`)
    console.log('')
    console.log(consoleColors.fronthack, 'You can now type:')
    console.log('')
    console.log(consoleColors.fronthack, `  cd ${name}\n  yarn start`)
    console.log('')
  } catch (err) {
    throw new Error(err)
  }
}