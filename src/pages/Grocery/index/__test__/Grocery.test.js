import { render, screen } from "@testing-library/react";
import Grocery from "../Grocery";

describe("Grocery page", () => {
  it("grocery index render", () => {
    render(<Grocery />);

    expect(screen.getByTestId("grocery-component")).toBeInTheDocument();
  });

  it("grocery renders title and add btn", () => {
    render(<Grocery />);

    expect(screen.getByText("Things to Buy")).toBeInTheDocument();
    expect(screen.getByText("Add Item")).toBeInTheDocument();
  });
});
