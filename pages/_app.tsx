import { useEffect } from 'react';
import { globalStyles } from '../styles/global';
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { darkTheme } from '../stitches.config';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    globalStyles()
  }, [])

  return <ThemeProvider
    attribute="class"
    defaultTheme="system"
    value={{
      light: "dark",
      dark: darkTheme.className
    }}
  >
    <Component {...pageProps}/>
  </ThemeProvider>
}

export default MyApp
