import * as afs from 'async-file'
import getFronthackPath from '../helpers/getFronthackPath'
import output from '../helpers/output'

export default async () => {
  const fronthackPath = await getFronthackPath()
  const content = await afs.readFile(`${fronthackPath}/package.json`, 'utf8')
  const object = JSON.parse(content)
  output(`v${object.version}`)
}