import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../api/recipe-api";

const initialRecipeState = {
  savedRecipes: [],
  searchedRecipes: [],
  status: "idle",
};

export const searchRecipe = createAsyncThunk(
  "recipe/searchRecipe",
  async (inputString) => {
    let data = await apiCall(inputString);
    data = data
      .map((item) => {
        return {
          id: item.canonical_id,
          name: item.name,
          instructions: item.instructions,
          video_url: item.original_video_url,
          sections: item.sections,
        };
      })
      .filter((item) => item.instructions && item.sections);
    return data;
  },
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialRecipeState,
  reducers: {
    update(state, action) {
      const previousState = state;
      previousState.savedRecipes = action.payload.items || [];
    },
    // searchRecipe(state, action) {
    //   const previousState = state;
    //   previousState.searchedRecipes = action.payload || [];
    // },
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
  extraReducers(builder) {
    builder
      .addCase(searchRecipe.pending, (state) => {
        const previousState = state;
        previousState.status = "loading";
      })
      .addCase(searchRecipe.fulfilled, (state, action) => {
        const previousState = state;
        previousState.status = "succeeded";
        previousState.searchedRecipes = action.payload || [];
      })
      .addCase(searchRecipe.rejected, (state) => {
        const previousState = state;
        previousState.state = "failed";
      });
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;
