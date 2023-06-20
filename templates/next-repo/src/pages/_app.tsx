import type { AppProps } from 'next/app'
import '../style/index.sass'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
