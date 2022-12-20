import getNewItemArray from "./getNewItemArray";
import addDocument from "../firebase/addItemInventory";

const firebaseDataUpdate = async (type, userData, newItem) => {
  const previousItems = [...userData.items] || [];
  const newData = {};
  newData.userId = userData.userId;
  newData.items = getNewItemArray(previousItems, newItem);

  await addDocument(
    type === "inventory" ? "inventory" : "grocery",
    newData,
    newData.userId,
  );
};

export default firebaseDataUpdate;
