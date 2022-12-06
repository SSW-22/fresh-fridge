import { createSlice } from "@reduxjs/toolkit";

const initialInventoryState = {
  userId: "",
  items: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialInventoryState,
  reducers: {
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
