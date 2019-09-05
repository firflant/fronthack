import * as afs from 'async-file'
import changeCase from 'case'
import { highlight } from 'cli-highlight'
import getFronthackPath from '../helpers/getFronthackPath'
import output from '../helpers/output'
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
  let parsedSassContent = sassContent
    .replace('Name', humanCase)
    .replace(/name/g, machinename)
  if (description) parsedSassContent = parsedSassContent.replace('Description', description)
  await afs.writeFile(`${projectSrc}/sass/${type}s/_${machinename}.sass`, parsedSassContent)
  await addImportToApp(projectSrc, type, machinename)
  output('\n--------------------------------------------------\n')
  output(`New element can have folowing initial HTML markup:\n`)
  console.log(highlight(`<div class="${machinename}"></div>`, { language: 'html' }))
  output('\n--------------------------------------------------\n')
}
