import * as afs from 'async-file'
import changeCase from 'case'
import getFronthackPath from '../helpers/getFronthackPath'
import consoleColors from './consoleColors'


/**
 * Generate blank React component from template.
 * @argument {string} projectRoot path to the directory of current project
 * @argument {bool} isNext whether current project is based on Next JS
 * @argument {string} type can be 'component' or 'global'
 * @argument {string} machinename unique name identifier of the component
 * @argument {string} description optional description of the component
 */
export default async (projectRoot, isNext, type, machinename, description = null) => {
  const projectSrc = `${projectRoot}${isNext ? '' : '/src'}`
  const fronthackPath = await getFronthackPath()
  let reactComponentTemplatePath
  switch (type) {
    case 'page':
      reactComponentTemplatePath = `${fronthackPath}/templates/react-page.js`
      break;

    case 'layout':
      reactComponentTemplatePath = `${fronthackPath}/templates/react-component-functional.js`
      break;

    default:
      reactComponentTemplatePath = isNext
      ? `${fronthackPath}/templates/react-component-functional.js`
      : `${fronthackPath}/templates/react-component-class.js`
      break;
  }

  if (type === 'page') {
    await afs.ensureDir(`${projectSrc}/${type}s`)
    const reactScreen = afs.readFile(reactComponentTemplatePath, 'utf8')
    let parsedReactScreen = reactScreen.replace(/PageName/g, machinename)
    if (isNext) parsedReactScreen = parsedReactScreen.replace("import React from 'react'\n", '')
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}.js`, parsedReactScreen)
    console.log(consoleColors.fronthack, 'Done!')
  } else {
    await afs.ensureDir(`${projectSrc}/${type}s/${machinename}`)
    // Fetch React component template
    const reactComponent = await afs.readFile(reactComponentTemplatePath, 'utf8')
    const kebabCase = changeCase.kebab(machinename)
    const humanCase = changeCase.sentence(machinename)
    let parsedReactComponent = reactComponent
      .replace(/ComponentName/g, machinename)
      .replace('component-name', kebabCase)
    if (isNext) parsedReactComponent = parsedReactComponent.replace("import React from 'react'\n", '')
    if (description) parsedReactComponent = parsedReactComponent.replace('Description', description)
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}/${machinename}.js`, parsedReactComponent)
    // Fetch sass template
    const sassContent = await afs.readFile(`${fronthackPath}/templates/sass-component.sass`, 'utf8')
    let parsedSassContent = sassContent
      .replace('// Name', "@import '../../style/variables'\n@import '../../style/mixins'\n\n// Name")
      .replace('Name', humanCase)
      .replace(/name/g, kebabCase)
    if (description) parsedSassContent = parsedSassContent.replace('Description', description)
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}/style.sass`, parsedSassContent)
    // Fetch index file template
    const indexFile = await afs.readFile(`${fronthackPath}/templates/react-component-index.js`, 'utf8')
    const parsedIndexFile = indexFile.replace('ComponentName', machinename)
    await afs.writeFile(`${projectSrc}/${type}s/${machinename}/index.js`, parsedIndexFile)
    console.log(consoleColors.fronthack, 'Done!')
  }
}
