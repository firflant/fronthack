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

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/src/designs`)
    const content = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/src/designs/README.md`, content)

    // .gitignore is named .gitignore_template to not be ignored during the insstalation.
    await fs.renameSync(`${projectRoot}/.gitignore_template`, `${projectRoot}/.gitignore`)

    // Install dependencies.
    await shell.cd(projectRoot)
    console.log(consoleColors.fronthack, 'Installing node dependencies...')
    await shell.exec('yarn install')

    // Download global styles.
    await fetchComponent(projectRoot, false, false, 'style', null)

    // Do initial git commit.
    await shell.exec('git init')
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Repository initiated by fronthack init command"', { silent: true })

    // Output success messages.
    console.log(consoleColors.fronthack, 'Fronthack Static HTML+jQuery project is ready for hacking!\nBegin by typing:')
    console.log('')
    console.log(consoleColors.fronthack, `  cd ${name}\n  yarn start`)
    console.log('')
  } catch (err) {
    throw new Error(err)
  }
}