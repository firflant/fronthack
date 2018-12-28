import * as fs from 'async-file'
import yarnModules from 'yarn-global-modules'
import globalModules from 'global-modules'

export default async () => {
  try {
    const yarnPath = `${yarnModules()}/node_modules/fronthack`
    await fs.readdir(yarnPath, 'utf8')
    return yarnPath
  } catch (err) {
    try {
      const npmPath = `${globalModules}/fronthack`
      await fs.readdir(npmPath, 'utf8')
      return npmPath
    } catch (err) {
      throw new Error(err)
    }
  }
}