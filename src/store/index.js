import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    inventory: inventoryReducer,
  },
});

const rootReducer = combineReducers({
  user: userSlice,
  inventory: inventoryReducer,
});

const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default store;
export { setupStore };
