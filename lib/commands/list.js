'use strict'

const githubGet = require('github-get')


module.exports = function() {
  console.log('')
  console.log('List of ready Fronthack components:')
  console.log('')
  githubGet('frontcraft/fronthack-repo', `src/sass/components`, function (err, files) {
    const unwanted = ['!TEMPLATE.sass', 'README.md', 'html']
    if (err) throw err
    files.forEach(function (file) {
      if (!unwanted.includes(file.name)) {
        console.log(file.name.replace('_', '- ').replace('.sass', ''))
      }
    })
    console.log('')
    console.log('Type \`fronthack component\` and enter its name to use any from list.')
  })
}