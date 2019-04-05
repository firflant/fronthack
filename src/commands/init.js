import prompt from 'prompt'

import initStatic from '../helpers/initStatic'
import initReact from '../helpers/initReact'
import initNext from '../helpers/initNext'
import userInput from '../helpers/userInput'
import consoleColors from '../helpers/consoleColors'

export default async nameParam => {
  try {
    // Collect variables.
    prompt.start()
    const { technology } = await userInput({
      name: 'technology',
      description: 'Pick a technology:\n1. Static HTML+jQuery run by Gulp\n2. React run by Webpack\n3. Next.js run by Webpack\n',
      type: 'number',
      pattern: '1|2|3',
      message: 'Select one from numbers above.',
    })

    switch (technology) {
      case 1:
        console.log(consoleColors.fronthack, 'Initializing a Static HTML project with Fronthack boilerplate...')
        initStatic(nameParam)
        break

      case 2:
        console.log(consoleColors.fronthack, 'Initializing a React app with Fronthack boilerplate...')
        initReact(nameParam)
        break

      case 3:
        console.log(consoleColors.fronthack, 'Initializing a Next.js app with Fronthack boilerplate...')
        initNext(nameParam)
        break

      default:
        console.log(consoleColors.error, 'Select one from numbers above.')
        break
    }

  } catch (err) {
    throw new Error(err)
  }
}