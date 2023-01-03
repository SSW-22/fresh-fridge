import recipeReducer, { recipeActions, searchRecipe } from "../recipeSlice";

describe("recipe reducer test", () => {
  it("initial", () => {
    expect(recipeReducer(undefined, { type: undefined })).toEqual({
      savedRecipes: {
        recipes: [],
        status: "idle",
      },
      searchedRecipes: {
        recipes: [],
        status: "idle",
      },
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
    const previousState = {
      savedRecipes: {
        recipes: [],
        status: "idle",
      },
      searchedRecipes: {
        recipes: [],
        status: "idle",
      },
    };

    expect(
      recipeReducer(
        previousState,
        recipeActions.update({
          userId: "id",
          items: [1, 2, 3],
        }),
      ),
    ).toEqual({
      savedRecipes: {
        recipes: [1, 2, 3],
        status: "idle",
      },
      searchedRecipes: {
        recipes: [],
        status: "idle",
      },
    });
  });

  // it("add recipes to saved recipes", async () => {
  //   const previousState = {
  //     savedRecipes: {
  //       recipes: [{ id: 1 }],
  //       status: "idle",
  //     },
  //     searchedRecipes: {
  //       recipes: [],
  //       status: "idle",
  //     },
  //   };
  //   const item = { id: 2 };
  //   expect(recipeReducer(previousState, addRecipe({ item }))).toEqual({
  //     lazy: true,
  //   });
  // });

  it("delete recipes to saved recipes", () => {
    const previousState = {
      savedRecipes: {
        recipes: [{ id: "1" }, { id: "2" }],
        status: "idle",
      },
      searchedRecipes: {
        recipes: [],
        status: "idle",
      },
    };

    expect(recipeReducer(previousState, recipeActions.deleteItem("2"))).toEqual(
      {
        savedRecipes: {
          recipes: [{ id: "1" }],
          status: "idle",
        },
        searchedRecipes: {
          recipes: [],
          status: "idle",
        },
      },
    );
  });
});
