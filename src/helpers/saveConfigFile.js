import * as afs from 'async-file'
import output from './output'


export default async (fronthackPath, projectRoot, type) => {
  try {
    const fronthackJson = await afs.readFile(`${fronthackPath}/package.json`, 'utf8')
    const config = await afs.readFile(`${fronthackPath}/templates/.fronthack`, 'utf8')
    const filledConfig = config
      .replace('TYPE_UNDEFINED', type)
      .replace('SRC_UNDEFINED', '/src')
      .replace('VERSION_UNDEFINED', JSON.parse(fronthackJson).version)
    await afs.writeFile(`${projectRoot}/.fronthack`, filledConfig)
    return JSON.parse(filledConfig)
  } catch (err) {
    output('Could not save the .fronthack configuration file.', 'error')
    throw true
  }
}
