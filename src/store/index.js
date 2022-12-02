import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
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
