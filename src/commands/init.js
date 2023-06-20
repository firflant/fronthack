import initJekyll from '../helpers/initJekyll'
import initNext from '../helpers/initNext'
import initReactJs from '../helpers/initReactJs'
import initReactTs from '../helpers/initReactTs'
import initGulp from '../helpers/initGulp'
import output from '../helpers/output'
import prompt from 'prompt'
import userInput from '../helpers/userInput'

export default async nameParam => {
  try {
    // Collect variables.
    prompt.start()
    const { technology } = await userInput({
      name: 'technology',
      description: 'Pick a technology:\n1. TypeScript React SPA\n2. JavaScript React SPA\n3. TypeScript Next.js SSR\n4. Gulp Static HTML site\n5. Jekyll (outdated)\n',
      type: 'number',
      pattern: '1|2|3|4|5',
      message: 'Select one from numbers above.',
    })

    switch (technology) {
      case 1:
        output('Creating a TypeScript React app with a Fronthack boilerplate...')
        initReactTs(nameParam)
        break

      case 2:
        output('Creating a React app with a Fronthack boilerplate...')
        initReactJs(nameParam)
        break

      case 3:
        output('Creating a Next.js app with a Fronthack boilerplate...')
        initNext(nameParam)
        break

      case 4:
        output('Creating a static site on Gulp with a Fronthack boilerplate...')
        initGulp(nameParam)
        break

      case 5:
        output('Creating a static site on Jekyll with a Fronthack boilerplate...')
        initJekyll(nameParam)
        break

      default:
        output('Select one from the numbers above.', 'warn')
        break
    }

  } catch (err) {
    throw new Error(err)
  }
}