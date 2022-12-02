import { render, screen } from "@testing-library/react";
import AddItem from "../AddItemBtn";

describe("Add button", () => {
  it("should render inventory button (type: inventory) when user in 'inventory' page", async () => {
    render(<AddItem type="inventory" />);
    const element = screen.getByText(/Add Item/i);
    expect(element).toBeInTheDocument();
  });
});
