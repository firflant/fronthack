import * as afs from 'async-file'
import consoleColors from './consoleColors'


export default async (fronthackPath, projectRoot, type) => {
  try {
    const fronthackJson = await afs.readFile(`${fronthackPath}/package.json`, 'utf8')
    const config = await afs.readFile(`${fronthackPath}/templates/.fronthack`, 'utf8')
    const filledConfig = config
      .replace('TYPE_UNDEFINED', type)
      .replace('SRC_UNDEFINED', ['react-next', 'jekyll'].includes(type) ? '' : '/src')
      .replace('VERSION_UNDEFINED', JSON.parse(fronthackJson).version)
    await afs.writeFile(`${projectRoot}/.fronthack`, filledConfig)
    return JSON.parse(filledConfig)
  } catch (err) {
    console.log(consoleColors.error, 'Could not save the .fronthack configuration file.')
    throw true
  }
}
