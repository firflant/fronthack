import prompt from 'prompt'
import fetchComponent from '../helpers/fetchComponent'
import regex from '../helpers/regex'
import userInput from '../helpers/userInput'


export default async (projectRoot, isReact, isNext, name) => {
  try {
    if (!name) {
      prompt.start()
      const { namePrompt } = await userInput({
        name: 'namePrompt',
        description: 'Machine name of a new component',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: `Name of the ${isReact ? 'react ' : ''}component must be in ${isReact ? 'PascalCase' : 'kebab-case'}.`,
        required: true,
      })
      name = namePrompt
    }
    await fetchComponent(projectRoot, isReact, isNext, name)
  } catch (err) {
    throw new Error(err)
  }
}