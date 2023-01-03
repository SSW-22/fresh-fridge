import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";
import userReducer from "./userSlice";
import groceryReducer from "./grocerySlice";
import recipeReducer from "./recipeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
    grocery: groceryReducer,
    recipe: recipeReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  grocery: groceryReducer,
  recipe: recipeReducer,
});

const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default store;
export { setupStore };
