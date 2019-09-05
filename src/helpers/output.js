import consoleColors from './consoleColors'

export default (message, type) => {
  const color = type === 'error'
    ? consoleColors.error
    : type === 'warn'
      ? consoleColors.warning
      : consoleColors.fronthack
  console.log(color, message)
  if (type === 'error') {
    console.log(consoleColors.error, 'Exiting.')
    process.exit(1)
  }
}