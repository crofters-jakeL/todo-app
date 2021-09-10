import type { AppProps } from 'next/app'
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/globals.css'

PrimeReact.ripple = true;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
