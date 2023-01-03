import { createSlice } from "@reduxjs/toolkit";
// import { items } from "../utils/dummyInventoryStore";

const initialInventoryState = {
  userId: "",
  items: [],
  reminderDays: "",
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialInventoryState,
  reducers: {
    update(state, action) {
      const previousState = state;
      previousState.userId = action.payload.userId;
      previousState.items = action.payload.items || [];
      previousState.reminderDays = action.payload.reminderDays;
    },
    addUser(state, action) {
      const previousState = state;
      previousState.userId = action.payload;
    },
    deleteUser(state) {
      const previousState = state;
      previousState.userId = "";
      previousState.items = [];
    },
    addReminderDays(state, action) {
      const previousState = state;
      previousState.reminderDays = action.payload;
    },
    addItem(state, action) {
      const previousState = state;
      const newItem = action.payload;
      const existItem = previousState.items.find(
        (item) => item.id === newItem.id,
      );
      if (!existItem) {
        previousState.items.push(newItem);
      }
    },
    deleteItem(state, action) {
      const id = action.payload;
      const previousState = state;
      const existItem = state.items.find((item) => item.id === id);
      if (existItem) {
        previousState.items = state.items.filter((item) => item.id !== id);
      }
    },
    changeCategory(state, action) {
      const previousState = state;
      const id = action.payload.selectedId;
      const selectedItem = previousState.items.find((item) => item.id === id);
      selectedItem.category = action.payload.category;
    },
  },
});

export const inventoryActions = inventorySlice.actions;

export default inventorySlice.reducer;
