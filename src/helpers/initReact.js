import * as afs from 'async-file'

import copy from 'recursive-copy'
import fetchComponent from './fetchComponent'
import fs from 'fs-extra'
import getFronthackPath from './getFronthackPath'
import output from './output'
import prompt from 'prompt'
import regex from './regex'
import saveConfigFile from './saveConfigFile'
import shell from 'shelljs'
import userInput from './userInput'

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
    if (name === 'fronthack') throw new Error('Name should be different than fronthack')
    const projectRoot = `${process.cwd()}/${name}`
    const fronthackPath = await getFronthackPath()

    // Copy next-repo file tree template
    await copy(`${fronthackPath}/templates/react-repo`, projectRoot, { dot: true })
    await shell.cd(projectRoot)

    // Add fronthack configuration file.
    const config = await saveConfigFile(fronthackPath, projectRoot, 'react')

    // Apply changes in index.js file.
    const scriptsImportTemplate = await afs.readFile(`${fronthackPath}/templates/fronthack-scripts-import.js`, 'utf8')
    const indexContent = await afs.readFile(`${projectRoot}/src/index.js`, 'utf8')
    const newIndexContent = indexContent
      .concat(scriptsImportTemplate)
    await afs.writeFile(`${projectRoot}/src/index.js`, newIndexContent)

    // Add Sass Lint configuration file.
    const sassLintRc = await afs.readFile(`${fronthackPath}/templates/.sasslintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.sasslintrc`, sassLintRc)

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/designs`)
    const readmeContent = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/designs/README.md`, readmeContent)

    // Fetch base styles.
    await fetchComponent(projectRoot, config, 'style')

    // Rename .gitignore template.
    await fs.renameSync(`${projectRoot}/.gitignore_template`, `${projectRoot}/.gitignore`)

    // Install dependencies.
    await shell.exec('yarn install')

    // Do initial git commit.
    await shell.exec('git init')
    await shell.exec('git add .', { silent: true })
    await shell.exec('git commit -m "Repository initiated by fronthack"', { silent: true})

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
