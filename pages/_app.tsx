import { useEffect } from 'react';
import { globalStyles } from '../styles/global';
import '../styles/globals.css'
import { useUserData } from '../lib/util/hooks';
import { UserContext } from '../lib/util/UserContext';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    globalStyles()
  }, [])

  const userData = useUserData();
  return <UserContext.Provider value={userData}>
    <Component {...pageProps}/>
  </UserContext.Provider>
}

export default MyApp
