import { createSlice } from "@reduxjs/toolkit";

const initialInventoryState = {
  items: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialInventoryState,
  reducers: {
    add(state, action) {
      console.log(state, action);
    },
    remove(state) {
      console.log(state);
    },
  },
});

export const inventoryActions = inventorySlice.actions;

export default inventorySlice.reducer;
