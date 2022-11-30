import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./inventorySlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    inventory: inventorySlice,
  },
});

export default store;
