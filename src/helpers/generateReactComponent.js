import * as afs from 'async-file'
import fs from 'fs-extra'
import changeCase from 'case'

import getFronthackPath from './getFronthackPath'
import output from '../helpers/output'


export default async (projectRoot, config, type, machinename) => {
  const fronthackPath = await getFronthackPath()
  const projectSrc = `${projectRoot}${config.src}`
  let reactComponentTemplatePath
  switch (type) {
    case 'page':
      reactComponentTemplatePath = `${fronthackPath}/templates/react-page.js`
      break;

    default:
      reactComponentTemplatePath = `${fronthackPath}/templates/react-component-functional.js`
      break;
  }

  if (type === 'page') {
    await fs.ensureDirSync(`${projectSrc}/${type}s`)
    const reactPage = await afs.readFile(reactComponentTemplatePath, 'utf8')
    let parsedReactPage = reactPage.replace(/PageName/g, machinename)
    if (config.type === 'react-next') parsedReactPage = parsedReactPage.replace("import React from 'react'\n", '')
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}.js`, parsedReactPage)
    output('Created new page.')
  } else {
    await fs.ensureDirSync(`${projectSrc}/${type}s/${machinename}`)
    // Fetch React component template
    const reactComponent = await afs.readFile(reactComponentTemplatePath, 'utf8')
    const kebabCase = changeCase.kebab(machinename)
    const humanCase = changeCase.sentence(machinename)
    let parsedReactComponent = reactComponent
      .replace(/ComponentName/g, machinename)
      .replace('component-name', kebabCase)
    if (config.type === 'react-next') parsedReactComponent = parsedReactComponent.replace("import React from 'react'\n", '')
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}/${machinename}.js`, parsedReactComponent)
    // Fetch sass template
    const sassContent = await afs.readFile(`${fronthackPath}/templates/sass-component.sass`, 'utf8')
    let parsedSassContent = sassContent
      .replace('// Name', "@import '../../style/variables'\n@import '../../style/mixins'\n\n// Name")
      .replace('Name', humanCase)
      .replace(/name/g, kebabCase)
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}/style.sass`, parsedSassContent)
    // Fetch index file template
    const indexFile = await afs.readFile(`${fronthackPath}/templates/react-component-index.js`, 'utf8')
    const parsedIndexFile = indexFile.replace('ComponentName', machinename)
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}/index.js`, parsedIndexFile)
    output('Component created.')
  }
}
