import * as afs from 'async-file'
import fs from 'fs-extra'
import prompt from 'prompt'
import shell from 'shelljs'
import copy from 'recursive-copy'
import download from 'download'

import getFronthackPath from './getFronthackPath'
import output from '../helpers/output'
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
        default: 'fronthack-jekyll'
      })
      name = namePrompt
    }
    if (name === 'fronthack') throw new Error('Name should be different than fronthack')
    const projectRoot = `${process.cwd()}/${name}`
    const fronthackPath = await getFronthackPath()

    // Create new Jekyll project
    await shell.exec(`jekyll new ${name}`)

    // Copy static-repo file tree from template.
    await copy(`${fronthackPath}/templates/jekyll-suite`, projectRoot, { overwrite: true })
    await shell.cd(projectRoot)

    // Add fronthack configuration file.
    const config = await saveConfigFile(fronthackPath, projectRoot, 'jekyll')

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/designs`)
    const content = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/designs/README.md`, content)

    // Arrange place for Sass and download global styles.
    await copy(`${fronthackPath}/templates/static-repo/src/sass`, `${projectRoot}/sass`)
    await fetchComponent(projectRoot, config, 'style')

    // Include fronthack-scripts.
    await fs.ensureDirSync(`${projectRoot}/dev-assets`)
    await fs.ensureDirSync(`${projectRoot}/dev-assets/icons`)
    const fronthackScriptsUrl = 'https://raw.githubusercontent.com/frontcraft/fronthack-scripts/master/'
    const indexJs = await download(`${fronthackScriptsUrl}index.js`)
    await afs.writeFile(`${projectRoot}/dev.js`, indexJs)
    const styles = await download(`${fronthackScriptsUrl}dev-assets/styles.css`)
    await afs.writeFile(`${projectRoot}/dev-assets/styles.css`, styles)
    const codeIcon = await download(`${fronthackScriptsUrl}dev-assets/icons/code.png`)
    await afs.writeFile(`${projectRoot}/dev-assets/icons/code.png`, codeIcon)
    const pictureIcon = await download(`${fronthackScriptsUrl}dev-assets/icons/picture-o.png`)
    await afs.writeFile(`${projectRoot}/dev-assets/icons/picture-o.png`, pictureIcon)

    // Do initial git commit.
    await shell.exec('git init')
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Repository initiated by fronthack init command"', { silent: true })

    // Output success messages.
    output('Fronthack project with Jekyll features is ready for hacking!\nBegin by typing:')
    output('')
    output(`  cd ${name}\n  jekyll serve`)
    output('')
  } catch (err) {
    throw new Error(err)
  }
}