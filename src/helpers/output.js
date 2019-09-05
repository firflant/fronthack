import consoleColors from './consoleColors'

export default (message, type) => {
  const color = type === 'error'
    ? consoleColors.error
    : type === 'warn'
      ? consoleColors.warning
      : consoleColors.fronthack
  console.log(color, message)
}