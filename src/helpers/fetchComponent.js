import fs from 'fs-extra'
import * as afs from 'async-file'
import githubGet from 'github-get'
import changeCase from 'case'
import { highlight } from 'cli-highlight'

import consoleColors from './consoleColors'
import generateSassComponent from './generateSassComponent'
import generateReactComponent from './generateReactComponent'
import addImportToApp from './addImportToApp'

const fronthackGet = (path) => new Promise((resolve, reject) => {
  githubGet('frontcraft/fronthack-components', path, (err, data, content) => {
    if (err) reject(err)
    resolve({ data, content })
  })
})

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Saves components data from fronthack-components GitHub repository for static
 * html version.
 * @argument {string} projectRoot path to the directory of current project
 * @argument {bool} isReact whether current project is based on React
 * @argument {bool} isNext whether current project is based on Next JS
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 */
export default async (projectRoot, isReact, isNext, machinename, description) => {
  try {
    const projectSrc = `${projectRoot}${isNext ? '' : '/src'}`

    // Exceptional behavior when fetching global styles.
    if (machinename === 'style') {
      const { content } = await fronthackGet('src/style')
      const baseStylesPath = `${projectSrc}/${isReact ? 'style' : 'sass/base'}`
      await fs.ensureDirSync(baseStylesPath)
      await asyncForEach(content, async (file) => {
        try {
          const { content: fileContent } = await fronthackGet(`src/style/${file}`)
          await afs.writeFile(`${baseStylesPath}/${file}`, fileContent)
        } catch (err) {
          throw new Error(err)
        }
      })

    // Behavior when fetching everything else.
    } else {
      console.log(consoleColors.fronthack, 'Fetching data from a Fronthack components repository...')
      const { content } = await githubGetSync('frontcraft/fronthack-components', 'src/components')

      // For React version
      if (isReact) {
        if (content.includes(machinename)) {
          const componentPath = `${projectSrc}/components/${machinename}`
          await fs.ensureDirSync(componentPath)
          const { content } = await githubGetSync('frontcraft/fronthack-components', `src/components/${machinename}`)
          const componentFiles = content.filter(file => file!== 'EXAMPLE.js')
          const saveFiles = new Promise(() => { componentFiles.forEach(async file => {
            const { content } = await githubGetSync('frontcraft/fronthack-components', `src/components/${machinename}/${file}`)
            const parsedContent = (isNext && file === `${machinename}.js`) ? content.replace("import React from 'react'\n", '') : content
            await afs.writeFile(`${componentPath}/${file}`, parsedContent)
          })})
          saveFiles
          console.log(consoleColors.fronthack, 'Found Fronthack component of given name and imported its code.')
        } else {
          console.log(consoleColors.fronthack, `There is no ready Fronthack component of name ${machinename}.`)
          console.log(consoleColors.fronthack, 'Generating a new blank one...')
          await generateReactComponent(projectRoot, isNext, 'component', machinename, description)
        }

      // For Static HTML version
      } else {
        const pascalCase = changeCase.pascal(machinename)
        if (content.includes(pascalCase)) {
          const { content } = await githubGetSync('frontcraft/fronthack-components', `src/components/${pascalCase}/style.sass`)
          const parsedContent = content
            // Remove imports unnecessary for static version
            .replace(/^.*@import.*\n+/gm, '')
            // Exceptional behavior that fixes icon font path.
            .replace('./fonts/waat-icons', '../fonts/waat-icons')
          await afs.writeFile(`${projectSrc}/sass/components/_${machinename}.sass`, parsedContent)
          // Read static.html and display it on the screen
          const { readmeContent } = await githubGetSync('frontcraft/fronthack-components', `src/components/${pascalCase}/README.md`)
          console.log(consoleColors.fronthack, 'Found Fronthack component of given name and imported its code.')
          const markup = readmeContent.match(/(?<=```html\n)[\s\S]*?(?=\n```)+/m)[0]
          console.log(consoleColors.fronthack, '\n------------------------------------------------------------\n')
          console.log(highlight(markup, { language: 'html' }))
          console.log(consoleColors.fronthack, '\n------------------------------------------------------------\n')
          await addImportToApp(projectSrc, 'component', machinename)
        } else {
          console.log(consoleColors.fronthack, `There is no ready Fronthack component of name ${machinename}.`)
          console.log(consoleColors.fronthack, 'Generating a new blank one...')
          await generateSassComponent(projectSrc, 'component', machinename, description)
        }
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
