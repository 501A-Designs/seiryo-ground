import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';

export function useUserData() {
  const [user] = useAuthState(auth);
  const [userData] = useDocument(doc(db, `users/${user && user.uid}`));

  return { user, userData };
}