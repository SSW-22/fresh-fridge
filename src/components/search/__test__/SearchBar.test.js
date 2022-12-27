import { screen, render } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("Search bar in Inventory page", () => {
  it("search bar render", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });
});
