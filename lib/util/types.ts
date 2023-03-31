import useSound from "use-sound"

export type User = {
  displayName:string,
  photoURL:string,
  email:string,
  metadata:{
    createdAt:string,
    creationTime:string,
    lastLoginAt:string,
    lastSignInTime:string
  }
}