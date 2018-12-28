import * as afs from 'async-file'
import getFronthackPath from '../helpers/getFronthackPath'
import consoleColors from '../helpers/consoleColors'

export default async () => {
  const fronthackPath = await getFronthackPath()
  const content = await afs.readFile(`${fronthackPath}/package.json`, 'utf8')
  const object = JSON.parse(content)
  console.log(consoleColors.fronthack, `v${object.version}`)
}