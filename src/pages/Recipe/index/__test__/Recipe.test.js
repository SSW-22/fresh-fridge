import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import Recipe from "../Recipe";

describe("Recipe page", () => {
  it("render recipe page", () => {
    renderWithProviders(<Recipe />);

    expect(screen.getByTestId("recipe-component")).toBeInTheDocument();
  });

  it("display recipe search bar when render", () => {
    renderWithProviders(<Recipe />);

    expect(screen.getByText(/search recipes/i)).toBeInTheDocument();
  });
});
