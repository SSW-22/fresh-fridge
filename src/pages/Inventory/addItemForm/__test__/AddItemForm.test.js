import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Inventory from "../../Inventory";
import renderWithProviders from "../../../../utils/test-utils";

function getItemName() {
  return screen.getByRole("textbox", { name: /name/i });
}

function getItemQty() {
  return screen.getByText(/quantity/i);
}

function getAddTo() {
  return screen.getByText(/fridge/i);
}

describe("Inventory List", () => {
  it("submit available when all inputs pass validation", async () => {
    // ????
    renderWithProviders(<Inventory />);
    user.click(screen.getByRole("button", { name: /Add item/i }));
    user.type(getItemName(), "apple");
    user.type(getItemQty(), 5);
    user.click(getAddTo());
    user.click(screen.getByRole("button", { name: /add item/i }));
    // const addItemBtn = screen.getByRole("button", { name: /Add item/i });
    // fireEvent.click(addItemBtn);
    const newItem = screen.getByText(/apple/i);
    expect(newItem).toBeInTheDocument();
  });
});
