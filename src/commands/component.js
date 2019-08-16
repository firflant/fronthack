import prompt from 'prompt'
import changeCase from 'case'
import fetchComponent from '../helpers/fetchComponent'
import regex from '../helpers/regex'
import userInput from '../helpers/userInput'


export default async (projectRoot, projectType, name) => {
  try {
    if (!name) {
      prompt.start()
      const { namePrompt } = await userInput({
        name: 'namePrompt',
        description: 'Machine name of a new component',
        type: 'string',
        pattern: regex.validName,
        message: 'It must contain only alphanumeric characters, dashes, underscores or slashes.',
        required: true,
      })
      name = namePrompt
    }
    const parsedName = projectType.includes('react') ? changeCase.pascal(name) : changeCase.kebab(name)
    await fetchComponent(projectRoot, projectType, parsedName)
  } catch (err) {
    throw new Error(err)
  }
}