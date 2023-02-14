import { useEffect } from 'react';
import { globalStyles } from '../styles/global';
import '../styles/globals.css'
import { useUserData } from '../lib/util/hooks';
import { UserContext } from '../lib/util/UserContext';
import { ThemeProvider } from 'next-themes'
import { darkTheme } from '../stitches.config';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    globalStyles()
  }, [])

  const userData = useUserData();
  return <UserContext.Provider value={userData}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: "dark",
        dark: darkTheme.className
      }}
    >
      <Component {...pageProps}/>
    </ThemeProvider>
  </UserContext.Provider>
}

export default MyApp
