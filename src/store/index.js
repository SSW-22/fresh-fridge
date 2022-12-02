import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});

const rootReducer = combineReducers({
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
