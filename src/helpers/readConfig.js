import * as afs from 'async-file'
import output from './output'

/**
 * Checks whether current dir is a React project.
 * @argument {string} projectRoot root path of the current project
 */
export default async projectRoot => {
  try {
    const config = await afs.readFile(`${projectRoot}/.fronthack`, 'utf8')
    return JSON.parse(config)
  } catch (err) {
    output('Could not read the "type" variable in .fronthack configuration file of this project.', 'error')
    throw true
  }
}
