import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";

const checkUserItems = async (type, userId) => {
  const docRef = doc(db, type, userId);
  const docSnap = await getDoc(docRef);
  const initialData = {
    status: "none",
  };
  const data = docSnap.exists() ? docSnap.data() : initialData;
  return {
    ...data,
  };
};

export default checkUserItems;
