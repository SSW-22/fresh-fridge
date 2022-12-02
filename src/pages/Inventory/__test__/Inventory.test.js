import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../../../utils/test-utils";
import Inventory from "../Inventory";

describe("Inventory page", () => {
  it("should render add item form when 'add item btn' clicked", async () => {
    renderWithProviders(<Inventory />);
    const addItemBtn = screen.getByRole("button", { name: /Add item/i });

    fireEvent.click(addItemBtn);
    const addItemForm = screen.getByTestId("adding-item-form");
    expect(addItemForm).toBeInTheDocument();
  });
});
