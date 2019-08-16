import * as afs from 'async-file'
import consoleColors from './consoleColors'

/**
 * Checks whether current dir is a React project.
 * @argument {string} projectRoot root path of the current project
 */
export default async (projectRoot) => {
  try {
    const content = await afs.readFile(`${projectRoot}/package.json`, 'utf8')
    if (content.includes('\"react\": \"')) {
      const content = await afs.readFile(`${projectRoot}/package.json`, 'utf8')
      return content.includes('\"next\": \"') ? 'react-next' : 'react'
    } else if (content.includes('\"fronthack-scripts\"')) {
      return 'static'
    }
  } catch (err) {
    const content = await afs.readFile(`${projectRoot}/Gemfile`, 'utf8')
    if (content.includes('jekyll')) {
      return 'jekyll'
    }
    console.log(consoleColors.error, 'You are not in a scope of Fronthack project.')
    throw true
  }
}
