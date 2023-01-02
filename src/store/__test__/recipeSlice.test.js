import recipeReducer, { recipeActions, searchRecipe } from "../recipeSlice";

describe("recipe reducer test", () => {
  it("initial", () => {
    expect(recipeReducer(undefined, { type: undefined })).toEqual({
      savedRecipes: [],
      searchedRecipes: [],
      status: "idle",
    });
  });

  it("get search recipes", () => {
    const previousState = { savedRecipes: [], searchedRecipes: [] };

    expect(recipeReducer(previousState, searchRecipe(""))).toEqual({
      savedRecipes: [],
      searchedRecipes: [],
    });
  });

  it("get saved recipes", () => {
    const previousState = { savedRecipes: [], searchedRecipes: [] };

    expect(
      recipeReducer(
        previousState,
        recipeActions.update({
          userId: "id",
          items: [1, 2, 3],
        }),
      ),
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
