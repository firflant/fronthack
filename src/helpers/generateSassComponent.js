import * as afs from 'async-file'
import changeCase from 'case'
import { highlight } from 'cli-highlight'
import getFronthackPath from '../helpers/getFronthackPath'
import consoleColors from './consoleColors'
import addImportToApp from './addImportToApp'


/**
 * Generate blank Sass component from template.
 * @argument {string} projectSrc path to the src directory of current project
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 */
export default async (projectSrc, type, machinename, description = null) => {
  const fronthackPath = await getFronthackPath()
  const sassContent = await afs.readFile(`${fronthackPath}/templates/sass-component.sass`, 'utf8')
  const humanCase = changeCase.sentence(machinename)
  const checkedMachinename = (type === 'layout') ? `layout-${machinename}` : machinename
  let parsedSassContent = sassContent
    .replace('Name', humanCase)
    .replace(/name/g, checkedMachinename)
  if (description) parsedSassContent = parsedSassContent.replace('Description', description)
  await afs.writeFile(`${projectSrc}/sass/${type}s/_${checkedMachinename}.sass`, parsedSassContent)
  await addImportToApp(projectSrc, type, checkedMachinename)
  console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
  console.log(consoleColors.fronthack, `New element can have folowing initial HTML markup:\n`)
  console.log(highlight(`<div class="${checkedMachinename}"></div>`, { language: 'html' }))
  console.log(consoleColors.fronthack, '\n--------------------------------------------------\n')
}
