import { createSlice } from "@reduxjs/toolkit";
// import { items } from "../utils/dummyInventoryStore";

const initialInventoryState = {
  userId: "",
  items: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialInventoryState,
  reducers: {
    update(state, action) {
      const previousState = state;
      previousState.userId = action.payload.userId;
      previousState.items = action.payload.items || [];
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
  },
});

export const inventoryActions = inventorySlice.actions;

export default inventorySlice.reducer;
