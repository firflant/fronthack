import prompt from 'prompt'

export default property => new Promise((resolve, reject) => {
  prompt.get(property, (err, result) => {
    if (err) reject(err)
    resolve(result)
  })
})