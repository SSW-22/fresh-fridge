import { fireEvent, render, screen } from "@testing-library/react";
import AddItem from "../AddItem";

describe("Add button", () => {
  it("When you click the button for the first time, a form appears", async () => {
    render(<AddItem />);
    const element = screen.getByText(/Add item/i);
    fireEvent.click(element);
    const addingItemForm = await screen.findByTestId("adding-item-form");
    expect(addingItemForm).toBeInTheDocument();
  });

  // it("When you click the button for the seconde time, d", async () => {
  //   render(<AddItem />);
  // });
});
