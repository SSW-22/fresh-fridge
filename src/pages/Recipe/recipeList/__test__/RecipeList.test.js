import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import RecipeList from "../RecipeList";

describe("recipe list test", () => {
  const searchedRecipes = [];

  it("recipe list render", () => {
    renderWithProviders(<RecipeList recipes={searchedRecipes} />);

    expect(screen.getByTestId("recipe-list-test")).toBeInTheDocument();
  });

  it("no item message when no item exist", () => {
    renderWithProviders(<RecipeList recipes={searchedRecipes} />);

    expect(screen.getByTestId("recipe-no-item-test")).toBeInTheDocument();
  });

  it("no result message when no item exist", () => {
    renderWithProviders(
      <RecipeList searchString="test" recipes={searchedRecipes} />,
    );

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
