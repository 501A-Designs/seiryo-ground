import { useEffect } from 'react';
import { globalStyles } from '../styles/global';
import '../styles/globals.css'
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
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
