import { createSlice } from "@reduxjs/toolkit";

const initialRecipeState = {
  savedRecipes: [],
  searchedRecipes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialRecipeState,
  reducers: {
    update(state, action) {
      const previousState = state;
      previousState.savedRecipes = action.payload || [];
    },
    searchRecipe(state, action) {
      const previousState = state;
      previousState.searchedRecipes = action.payload || [];
    },
    addItem(state, action) {
      const previousState = state;
      const newRecipe = action.payload;
      const existRecipe = previousState.savedRecipes.find(
        (item) => item.id === newRecipe.id,
      );
      if (!existRecipe) {
        previousState.savedRecipes.push(newRecipe);
      }
    },
    deleteItem(state, action) {
      const id = action.payload;
      const previousState = state;
      const existRecipe = state.savedRecipes.find((item) => item.id === id);
      if (existRecipe) {
        previousState.savedRecipes = state.savedRecipes.filter(
          (item) => item.id !== id,
        );
      }
    },
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;
