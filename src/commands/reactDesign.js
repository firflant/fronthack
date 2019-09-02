import * as afs from 'async-file'
import fs from 'fs-extra'
import prompt from 'prompt'
import sizeOf from 'image-size'
import regex from '../helpers/regex'
import userInput from '../helpers/userInput'


export default async (projectRoot) => {
  try {
    // Load list of avaliable design files
    const files = await afs.readdir(`${projectRoot}/designs`)
    let design = {
      files: files.filter((n) => n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.png') || n.endsWith('.svg')),
      description: 'Which design you would like to pair with a page?\n',
      patternArray: [],
    }
    design.files.map((file, i) => {
      design.description = `${design.description}${i}: ${file}\n`
      design.patternArray.push(i)
    })
    design.pattern = new RegExp(design.patternArray.join('|'))
    design.description = `${design.description}Select number from the list above`

    // Collect variables.
    prompt.start()
    const { designIndex, url } = await userInput([
      {
        name: 'designIndex',
        description: design.description,
        type: 'string',
        pattern: design.pattern,
        message: 'It must be a number from the list',
        required: true,
      },
      {
        name: 'url',
        description: 'Type a route of the page to pair (eg. index, news, about)\n',
        type: 'string',
        pattern: regex.validName,
        message: 'It must contain only alphanumeric characters, dashes, underscores or slashes.',
        required: true,
        default: 'index',
      },
    ])

    const selectedHtml = url
    const selectedHtmlName = selectedHtml.replace(/\.[^/.]+$/, '').replace(/[\/\\]+$/, '-')
    const selectedDesign = design.files[designIndex]

    // Apply new design as a background CSS property
    const devCss = `${projectRoot}/designs/connect-designs.css`
    await fs.ensureFileSync(devCss)
    const data = await afs.readFile(devCss, 'utf8')
    let dimensions = sizeOf(`${projectRoot}/designs/${selectedDesign}`)
    // If width is bigger than 2000px, that means that it is doublesize.
    if (dimensions.width >= 2000) {
      dimensions.width = dimensions.width / 2
    }
    const newData = `${data}.show-designs .designs--${selectedHtmlName}, .show-code-designs .designs--${selectedHtmlName} { background-image: url('../designs/${selectedDesign}'); width: ${dimensions.width}px; margin: 0 ${dimensions.width / -2}px; }\n`
    await afs.writeFile(devCss, newData)

    // Display output.
    console.log(`Done! ${selectedDesign} attached to ${selectedHtml} page.`)
  } catch (err) {
    throw new Error(err)
  }
}