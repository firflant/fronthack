import prompt from 'prompt'

import initStatic from '../helpers/initStatic'
import initJekyll from '../helpers/initJekyll'
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
      description: 'Pick a technology:\n1. Basic static site\n2. Jekyll\n3. React\n4. Next.js\n',
      type: 'number',
      pattern: '1|2|3',
      message: 'Select one from numbers above.',
    })

    switch (technology) {
      case 1:
        console.log(consoleColors.fronthack, 'Initializing a static site on Gulp with Fronthack boilerplate...')
        initStatic(nameParam)
        break

      case 2:
        console.log(consoleColors.fronthack, 'Initializing a static site on Jekyll with Fronthack boilerplate...')
        initJekyll(nameParam)
        break

      case 3:
        console.log(consoleColors.fronthack, 'Initializing a React app with Fronthack boilerplate...')
        initReact(nameParam)
        break

      case 4:
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