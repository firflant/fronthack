'use strict'

const fs = require('fs-extra')
const prompt = require('prompt')
const getFronthackPath = require('../helpers/getFronthackPath')
const regex = require('../helpers/regex')
const generateReactComponent = require('../helpers/generateReactComponent')


module.exports = (projectRoot, isReact, isNext) => {
  const pageSchema = {
    properties: {
      machinename: {
        description: 'Name of new page (ex. contact, articles, about )',
        type: 'string',
        pattern: isReact ? regex.pascalCase : regex.kebabCase,
        message: `Name must be in ${isReact ? 'PascalCase' : 'kebab-case'}.`,
        required: true
      }
    }
  }
  prompt.start()
  prompt.get(pageSchema, (err, result) => {
    if (isReact) {
      if (!isNext) {
        generateReactComponent(`${projectRoot}/src`, 'screen', result.machinename)
      } else {
        console.log('In NextJS, please do that by yourself! Nothing happened.')
      }
    } else {
      getFronthackPath(fronthackPath => {
        fs.readFile(`${fronthackPath}/lib/templates/page.html`, 'utf8', (err, content) => {
          if (err) throw err
          fs.writeFile(`${projectRoot}/src/${result.machinename}.html`, content, (err) => {
            if (err) throw err
          })
        })
      })
    }
  })
}