import recipeReducer, { recipeActions } from "../recipeSlice";

describe("recipe reducer test", () => {
  it("initial", () => {
    expect(recipeReducer(undefined, { type: undefined })).toEqual({
      savedRecipes: [],
      searchedRecipes: [],
    });
  });

  it("get search recipes", () => {
    const previousState = { savedRecipes: [], searchedRecipes: [] };

    expect(
      recipeReducer(previousState, recipeActions.searchRecipe([1, 2, 3])),
    ).toEqual({
      savedRecipes: [],
      searchedRecipes: [1, 2, 3],
    });
  });

  it("get saved recipes", () => {
    const previousState = { savedRecipes: [], searchedRecipes: [] };

    expect(
      recipeReducer(previousState, recipeActions.update([1, 2, 3])),
    ).toEqual({
      savedRecipes: [1, 2, 3],
      searchedRecipes: [],
    });
  });

  it("add recipes to saved recipes", () => {
    const previousState = { savedRecipes: [{ id: 1 }], searchedRecipes: [] };

    expect(
      recipeReducer(previousState, recipeActions.addItem({ id: 2 })),
    ).toEqual({
      savedRecipes: [{ id: 1 }, { id: 2 }],
      searchedRecipes: [],
    });
  });

  it("delete recipes to saved recipes", () => {
    const previousState = { savedRecipes: [{ id: 1 }], searchedRecipes: [] };

    expect(
      recipeReducer(previousState, recipeActions.deleteItem({ id: 2 })),
    ).toEqual({
      savedRecipes: [{ id: 1 }],
      searchedRecipes: [],
    });
  });
});
