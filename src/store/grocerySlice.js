import { createSlice } from "@reduxjs/toolkit";
// import { groceryItems } from "../utils/dummyInventoryStore";

const initialGroceryState = {
  userId: "",
  items: [],
};

const grocerySlice = createSlice({
  name: "grocery",
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
      } else {
        existItem.name = newItem.name;
        existItem.qty = newItem.qty;
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
  },
});

export const groceryActions = grocerySlice.actions;

export default grocerySlice.reducer;
