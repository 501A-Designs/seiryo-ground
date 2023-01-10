import { useEffect } from 'react';
import { globalStyles } from '../styles/global';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    globalStyles()
  }, [])

  return <Component {...pageProps}/>
}

export default MyApp
