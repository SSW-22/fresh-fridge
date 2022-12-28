import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import RecipeList from "../RecipeList";

describe("recipe list test", () => {
  const dummyItems = {
    savedRecipes: [],
    searchedRecipes: [],
  };

  it("recipe list render", () => {
    renderWithProviders(<RecipeList />);

    expect(screen.getByTestId("recipe-list-test")).toBeInTheDocument();
  });

  it("no item message when no item exist", () => {
    renderWithProviders(<RecipeList />, {
      preloadedState: {
        recipe: dummyItems,
      },
    });

    expect(screen.getByTestId("recipe-no-item-test")).toBeInTheDocument();
  });
});
