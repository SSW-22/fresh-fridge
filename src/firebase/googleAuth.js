import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import auth from "./Firebase";

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const signOutWithGoogle = () => {
  signOut(auth);
};

export { signInWithGoogle, signOutWithGoogle };
