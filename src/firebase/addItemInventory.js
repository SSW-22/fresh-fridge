import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

const addDocument = (collectionName, documentObj, userId) => {
  const docRef = doc(collection(db, collectionName), userId);
  return setDoc(docRef, {
    ...documentObj,
    // timestamp: serverTimestamp(),
  });
};

export default addDocument;
