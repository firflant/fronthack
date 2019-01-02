import prompt from 'prompt'
import fetchComponent from '../helpers/fetchComponent'
import regex from '../helpers/regex'
import userInput from '../helpers/userInput'


export default async (projectRoot, isReact, isNext) => {
  try {
    prompt.start()
    const { machinename } = await userInput([
      {
        name: 'machinename',
        description: 'Machine name of a new component',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: `Name of the ${isReact ? 'react ' : ''}component must be in ${isReact ? 'PascalCase' : 'kebab-case'}.`,
        required: true,
      },
    ])
    await fetchComponent(projectRoot, isReact, isNext, machinename)
  } catch (err) {
    throw new Error(err)
  }
}