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
        default: 'fronthack-next'
      })
      name = namePrompt
    }
    if (name === 'fronthack') throw new Error('Name should be different than fronthack')
    const projectRoot = `${process.cwd()}/${name}`
    const fronthackPath = await getFronthackPath()

    // Copy next-repo file tree template
    await copy(`${fronthackPath}/templates/next-repo`, projectRoot, { dot: true })
    await shell.cd(projectRoot)

    // Add fronthack configuration file.
    const config = await saveConfigFile(fronthackPath, projectRoot, 'react-next')

    // Prepare designs directory.
    await fs.ensureDirSync(`${projectRoot}/designs`)
    const readmeContent = await afs.readFile(`${fronthackPath}/templates/designs-readme.md`, 'utf8')
    await afs.writeFile(`${projectRoot}/designs/README.md`, readmeContent)

    // Rename .gitignore template.
    await fs.renameSync(`${projectRoot}/.gitignore_template`, `${projectRoot}/.gitignore`)

    // Add fronthack scripts import.
    const scriptsImportTemplate = await afs.readFile(`${fronthackPath}/templates/fronthack-scripts-import.js`, 'utf8')
    const appContent = await afs.readFile(`${projectRoot}/src/pages/_app.tsx`, 'utf8')
    const newAppContent = appContent
      .concat(scriptsImportTemplate)
    await afs.writeFile(`${projectRoot}/src/pages/_app.tsx`, newAppContent)

    // Add Sass Lint configuration file.
    const sassLintRc = await afs.readFile(`${fronthackPath}/templates/.sasslintrc`, 'utf8')
    await afs.writeFile(`${projectRoot}/.sasslintrc`, sassLintRc)

    // Fetch base styles.
    await fetchComponent(projectRoot, config, 'style')

    // Install dependencies.
    await shell.exec('yarn install')

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