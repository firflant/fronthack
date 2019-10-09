import * as afs from 'async-file'
import output from './output'


/**
 * Adds new import to app.sass file
 * @argument {string} projectSrc path to the src directory of current project
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 */
export default async (projectSrc, type, machinename) => {
  try {
    const data = await afs.readFile(`${projectSrc}/sass/app.sass`, 'utf8')
    const newData = data.replace(`New ${type}s`, `New ${type}s\n@import '${type}s/${machinename}'`)
    await afs.writeFile(`${projectSrc}/sass/app.sass`, newData)
    output('Import added to app.sass')
  } catch (err) {
    throw new Error(err)
  }
}
