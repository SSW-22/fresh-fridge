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
      // const existItem = previousState.inventory.items.find(
      //   (item) => item.id === newItem.id,
      // );

      // if (!existItem) {
      //   previousState.inventory.items.push(newItem);
      // }
      previousState.inventory.items.push(newItem);
    },
  },
});

export const inventoryActions = inventorySlice.actions;

export default inventorySlice.reducer;
