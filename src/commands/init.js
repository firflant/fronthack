import initHugo from '../helpers/initHugo'
import initJekyll from '../helpers/initJekyll'
import initNext from '../helpers/initNext'
import initReactJs from '../helpers/initReactJs'
import initReactTs from '../helpers/initReactTs'
import initStatic from '../helpers/initStatic'
import output from '../helpers/output'
import prompt from 'prompt'
import userInput from '../helpers/userInput'

export default async nameParam => {
  try {
    // Collect variables.
    prompt.start()
    const { technology } = await userInput({
      name: 'technology',
      description: 'Pick a technology:\n1. React JS\n2. React TypeScript\n3. Static HTML\n4. Jekyll (legacy)\n5. Next (legacy)\n6. Hugo (legacy)\n',
      type: 'number',
      pattern: '1|2|3|4|5',
      message: 'Select one from numbers above.',
    })

    switch (technology) {
      case 1:
        output('Initializing a React app with a Fronthack boilerplate...')
        initReactJs(nameParam)
        break

      case 2:
        output('Initializing a TypeScript React app with a Fronthack boilerplate...')
        initReactTs(nameParam)
        break

      case 3:
        output('Initializing a static site on Gulp with a Fronthack boilerplate...')
        initStatic(nameParam)
        break

      case 4:
        output('Initializing a static site on Jekyll with a Fronthack boilerplate...')
        initJekyll(nameParam)
        break

      case 5:
        output('Initializing a Next.js app with a Fronthack boilerplate...')
        initNext(nameParam)
        break

      case 6:
        output('Initializing a static site on Hugo with Fronthack boilerplate...')
        initHugo(nameParam)
        break

      default:
        output('Select one from the numbers above.', 'warn')
        break
    }

  } catch (err) {
    throw new Error(err)
  }
}