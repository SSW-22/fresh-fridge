import { screen } from "@testing-library/react";
import renderWithProviders from "../../../utils/test-utils";
import SearchBar from "../SearchBar";

describe("Search bar in Inventory page", () => {
  it("search bar render", () => {
    renderWithProviders(<SearchBar />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });
});
