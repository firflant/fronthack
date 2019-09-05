import * as afs from 'async-file'
import prompt from 'prompt'
import getFronthackPath from '../helpers/getFronthackPath'
import regex from '../helpers/regex'
import generateReactComponent from '../helpers/generateReactComponent'
import userInput from '../helpers/userInput'
import output from '../helpers/output'


export default async (projectRoot, config, name) => {
  try {
    if (!name) {
      prompt.start()
      const { namePrompt } = await userInput({
        name: 'namePrompt',
        description: 'Name of new page (eg. contact, news, about)',
        type: 'string',
        pattern: config.type.includes('react') ? regex.pascalCase : regex.kebabCase,
        message: `Name must be in ${config.type.includes('react') ? 'PascalCase' : 'kebab-case'}.`,
        required: true,
      })
      name = namePrompt
    }

    if (config.type.includes('react')) {
      if (config.type !== 'react-next') {
        generateReactComponent(projectRoot, config, 'page', name)
      } else {
        output('Nothing happened! In NextJS please add new pages that manually, by creating a file in "/pages" directory.')
      }
    } else {
      const fronthackPath = await getFronthackPath()
      if (config.type === 'static') {
        const content = await afs.readFile(`${fronthackPath}/templates/page.html`, 'utf8')
        await afs.writeFile(`${projectRoot}/src/${name}.html`, content)
        output('Done!')
      } else if (config.type === 'jekyll') {
        const content = await afs.readFile(`${fronthackPath}/templates/jekyll-suite/index.markdown`, 'utf8')
        await afs.writeFile(`${projectRoot}${config.src}/${name}.markdown`, content)
        output('Done!')
      } else {
        output(`Error! Wrong action for the project of type "${config.type}".`)
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}