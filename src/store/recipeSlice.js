import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseDataUpdate } from "../utils/firebaseDataUpdate";
import apiCall from "../api/recipe-api";

// const initialRecipeState = {
//   savedRecipes: [],
//   searchedRecipes: [],
//   status: "idle",
// };
const initialRecipeState = {
  savedRecipes: {
    recipes: [],
    status: "idle",
  },
  searchedRecipes: {
    recipes: [],
    status: "idle",
  },
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

export const addRecipe = createAsyncThunk(
  "recipe/addRecipe",
  async ({ item, userData }) => {
    firebaseDataUpdate("recipe", userData, item);
    return item;
  },
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialRecipeState,
  reducers: {
    update(state, action) {
      const previousState = state;
      previousState.savedRecipes.recipes = action.payload.items || [];
    },
    setStatusIdle(state) {
      const previousState = state;
      previousState.savedRecipes.status = "idle";
    },
    // searchRecipe(state, action) {
    //   const previousState = state;
    //   previousState.searchedRecipes = action.payload || [];
    // },
    // addItem(state, action) {
    //   const previousState = state;
    //   const newRecipe = action.payload;
    //   const existRecipe = previousState.savedRecipes.find(
    //     (item) => item.id === newRecipe.id,
    //   );
    //   if (!existRecipe) {
    //     previousState.savedRecipes.push(newRecipe);
    //   }
    // },
    deleteItem(state, action) {
      const id = action.payload;
      const previousState = state;
      const existRecipe = state.savedRecipes.recipes.find(
        (item) => item.id === id,
      );
      if (existRecipe) {
        previousState.savedRecipes.recipes = state.savedRecipes.recipes.filter(
          (item) => item.id !== id,
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchRecipe.pending, (state) => {
        const previousState = state;
        previousState.searchedRecipes.status = "loading";
      })
      .addCase(searchRecipe.fulfilled, (state, action) => {
        const previousState = state;
        previousState.searchedRecipes.status = "succeeded";
        previousState.searchedRecipes.recipes = action.payload || [];
      })
      .addCase(searchRecipe.rejected, (state) => {
        const previousState = state;
        previousState.searchedRecipes.state = "failed";
      });
    builder
      .addCase(addRecipe.pending, (state) => {
        const previousState = state;
        previousState.savedRecipes.status = "loading";
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        const previousState = state;
        previousState.savedRecipes.status = "succeeded";
        const newRecipe = action.payload;
        const existRecipe = previousState.savedRecipes.recipes.find(
          (item) => item.id === newRecipe.id,
        );
        if (!existRecipe) {
          previousState.savedRecipes.recipes.push(newRecipe);
        }
      })
      .addCase(addRecipe.rejected, (state) => {
        const previousState = state;
        previousState.savedRecipes.state = "failed";
      });
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(searchRecipe.pending, (state) => {
  //       const previousState = state;
  //       previousState.status = "loading";
  //     })
  //     .addCase(searchRecipe.fulfilled, (state, action) => {
  //       const previousState = state;
  //       previousState.status = "succeeded";
  //       previousState.searchedRecipes = action.payload || [];
  //     })
  //     .addCase(searchRecipe.rejected, (state) => {
  //       const previousState = state;
  //       previousState.state = "failed";
  //     });
  // },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;
