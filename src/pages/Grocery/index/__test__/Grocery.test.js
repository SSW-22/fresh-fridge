import { fireEvent, screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import Grocery from "../Grocery";

describe("Grocery page", () => {
  it("grocery index render", () => {
    renderWithProviders(<Grocery />);

    expect(screen.getByTestId("grocery-component")).toBeInTheDocument();
  });

  it("grocery renders title and add btn", () => {
    renderWithProviders(<Grocery />);

    expect(screen.getByText("Things to Buy")).toBeInTheDocument();
    expect(screen.getByText("Add Item")).toBeInTheDocument();
  });

  it("grocery renders add form when add btn clicked", async () => {
    renderWithProviders(<Grocery />);
    fireEvent.click(screen.getByText("Add Item"));
    expect(await screen.findByTestId("add-grocery-form")).toBeInTheDocument();
  });
});
