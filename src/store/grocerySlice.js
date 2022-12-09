import { createSlice } from "@reduxjs/toolkit";

const initialGroceryState = {
  userId: "",
  items: [],
};

const grocerySlice = createSlice({
  name: "inventory",
  initialState: initialGroceryState,
  reducers: {
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

export const groceryActions = grocerySlice.actions;

export default grocerySlice.reducer;
