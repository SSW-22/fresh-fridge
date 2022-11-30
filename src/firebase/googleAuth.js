import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export default signInWithGoogle;
