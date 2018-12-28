import prompt from 'prompt'
import generateReactComponent from '../helpers/generateReactComponent'
import generateSassComponent from '../helpers/generateSassComponent'
import regex from '../helpers/regex'
import userInput from '../helpers/userInput'


export default async (projectRoot, isReact, isNext) => {
  try {
    prompt.start()
    const { machinename } = await userInput({
      name: 'machinename',
      description: 'Machine name of a new layout section component',
      type: 'string',
      pattern: isReact ? regex.pascalCase : regex.kebabCase,
      message: `Name must be in ${isReact ? 'PascalCase' : 'kebab-case'}.`,
      required: true,
    })
    if (isReact) {
      generateReactComponent(projectRoot, isNext, 'layout', `Layout${machinename}`)
    } else {
      generateSassComponent(`${projectRoot}/src`, 'layout', machinename)
    }
  } catch (err) {
    throw new Error(err)
  }
}