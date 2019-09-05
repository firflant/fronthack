import openUrl from 'openurl'
import output from '../helpers/output'

export default () => {
  const url = 'https://docs.fronthack.com/?path=/story/components-basic-styles--default'
  output('')
  output('Browse a library of ready Fronthack components here:')
  output(url)
  output('')
  openUrl.open(url)
}