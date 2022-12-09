import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";
import userReducer from "./userSlice";
import groceryReducer from "./grocerySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
    grocery: groceryReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  grocery: groceryReducer,
});

const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default store;
export { setupStore };
