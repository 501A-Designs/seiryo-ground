import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbPEfCeZFQbqJ9o2mc7aiZPXahtxoyLxM",
  authDomain: "seiryo-ground.firebaseapp.com",
  projectId: "seiryo-ground",
  storageBucket: "seiryo-ground.appspot.com",
  messagingSenderId: "606061318220",
  appId: "1:606061318220:web:29652642457699d2b5e4e9",
  measurementId: "G-PF9D6JPV8B"
};

let analytics,db,auth;

if (firebaseConfig?.projectId) {
  const app = initializeApp(firebaseConfig);
  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

const app = initializeApp(firebaseConfig);

export {app, analytics,db,auth};