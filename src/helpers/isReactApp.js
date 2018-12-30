import * as afs from 'async-file'

/**
 * Checks whether current dir is a React project.
 * @argument {string} projectRoot root path of the current project
 */
export default async (projectRoot) => {
  try {
    const content = await afs.readFile(`${projectRoot}/package.json`, 'utf8')
    return content.includes('\"react\": \"')
  } catch (err) {
    throw new Error(err)
  }
}
