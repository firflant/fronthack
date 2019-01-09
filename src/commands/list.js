import openUrl from 'openurl'
import consoleColors from '../helpers/consoleColors'

export default () => {
  const url = 'https://frontcraft.github.io/fronthack-components/?selectedKind=Components%2FBasic%20styles&selectedStory=default'
  console.log('')
  console.log(consoleColors.fronthack, 'Browse a library of ready Fronthack components here:')
  console.log(consoleColors.fronthack, url)
  console.log('')
  openUrl.open(url)
}