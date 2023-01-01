import getNewItemArray from "./getNewItemArray";
import addDocument from "../firebase/addItemInventory";

const firebaseDataUpdate = async (type, userData, newItem) => {
  const previousItems = [...userData.items] || [];
  const newData = {};
  newData.userId = userData.userId;
  newData.items = getNewItemArray(previousItems, newItem);
  if (type === "inventory") {
    newData.reminderDays = userData.reminderDays;
  }

  await addDocument(type, newData, newData.userId);
};

const firebaseReminderDateUpdate = async (userData, newReminderDays) => {
  const newData = {};
  newData.userId = userData.userId;
  newData.items = userData.items;
  newData.reminderDays = newReminderDays;

  await addDocument("inventory", newData, newData.userId);
};

export { firebaseDataUpdate, firebaseReminderDateUpdate };
