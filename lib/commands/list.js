'use strict'

const githubGet = require('github-get')


module.exports = () => {
  console.log('')
  console.log('List of ready Fronthack components:')
  console.log('')
  githubGet('frontcraft/fronthack-repo', `src/sass/components`, (err, files) => {
    const unwanted = ['!TEMPLATE.sass', 'README.md', 'html']
    if (err) throw err
    files.forEach((file) => {
      if (!unwanted.includes(file.name)) {
        console.log(file.name.replace('_', '- ').replace('.sass', ''))
      }
    })
    console.log('')
    console.log('Type \`fronthack component\` and enter its name to use any from list.')
  })
}