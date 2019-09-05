import fs from 'fs-extra'
import * as afs from 'async-file'
import githubGet from 'github-get'
import changeCase from 'case'
import { highlight } from 'cli-highlight'

import output from '../helpers/output'
import generateSassComponent from './generateSassComponent'
import generateReactComponent from './generateReactComponent'
import addImportToApp from './addImportToApp'
import userInput from '../helpers/userInput'


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


export default async (projectRoot, config, machinename) => {
  try {
    const projectSrc = `${projectRoot}${config.src}`
    // Exceptional behavior when fetching global styles.
    if (machinename === 'style') {
      const { content } = await fronthackGet('src/style')
      const baseStylesPath = `${projectSrc}/${config.type.includes('react') ? 'style' : 'sass/base'}`
      await fs.ensureDirSync(baseStylesPath)
      await asyncForEach(content, async (file) => {
        try {
          const { content: fileContent } = await fronthackGet(`src/style/${file}`)
          await afs.writeFile(`${baseStylesPath}/${file}`, fileContent)
        } catch (err) {
          throw new Error(err)
        }
      })

    // Exceptional behavior when trying to fetch a Form component.
    } else if (config.type.includes('react') && machinename === 'Form') {
      output('The advanced Fronthack Form component has been promoted to a standalone npm package. To use it on a project, do following:')
      output('yarn add react-standalone-form')

    // Behavior when fetching everything else.
    } else {
      output('Fetching data from a Fronthack components repository...')
      const { content } = await fronthackGet('src/components')

      // For React version
      if (config.type.includes('react')) {
        if (content.includes(machinename)) {
          const componentPath = `${projectSrc}/components/${machinename}`
          await fs.ensureDirSync(componentPath)
          const { content } = await fronthackGet(`src/components/${machinename}`)
          const componentFiles = content.filter(file => file!== 'EXAMPLE.js')
          await asyncForEach(componentFiles, async (file) => {
            try {
              const { content: fileContent } = await fronthackGet(`src/components/${machinename}/${file}`)
              const parsedContent = (config.type === 'react-next' && file === `${machinename}.js`)
                ? fileContent.replace("import React from 'react'\n", '')
                : fileContent
              await afs.writeFile(`${componentPath}/${file}`, parsedContent)
            } catch (err) {
              throw new Error(err)
            }
          })
          output('Found Fronthack component of given name and imported its code.')
        } else {
          output(`There is no ready Fronthack component of name ${machinename}.`)
          output('Generating a new blank one...')
          const { description } = await userInput({
            name: 'description',
            description: 'Write short component description',
            type: 'string',
          })
          await generateReactComponent(projectRoot, config, 'component', machinename, description)
        }

      // For Static HTML version
      } else {
        const pascalCase = changeCase.pascal(machinename)
        if (content.includes(pascalCase)) {
          const { content } = await fronthackGet(`src/components/${pascalCase}/style.sass`)
          const parsedContent = content
            // Remove imports unnecessary for static version
            .replace(/^.*@import.*\n+/gm, '')
            // Exceptional behavior that fixes icon font path.
            .replace('./fonts/waat-icons', '../fonts/waat-icons')
          await afs.writeFile(`${projectSrc}/sass/components/_${machinename}.sass`, parsedContent)
          // Read static.html and display it on the screen.
          const { content: readmeContent } = await fronthackGet(`src/components/${pascalCase}/README.md`)
          output('Found Fronthack component of given name and imported its code.')
          const markup = readmeContent.match(/(?<=```html\n)[\s\S]*?(?=\n```)/m)[0]
          output('\n------------------------------------------------------------\n')
          console.log(highlight(markup, { language: 'html' }))
          output('\n------------------------------------------------------------\n')
          await addImportToApp(projectSrc, 'component', machinename)
        } else {
          output(`There is no ready Fronthack component of name ${machinename}.`)
          output('Generating a new blank one...')
          const { description } = await userInput({
            name: 'description',
            description: 'Write short component description',
            type: 'string',
          })
          await generateSassComponent(projectSrc, 'component', machinename, description)
        }
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
