import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import GroceryList from "../GroceryList";
import { groceryItems } from "../../../../utils/dummyInventoryStore";

const emptyItems = {
  userId: "test",
  items: [],
};

const dummyItems = {
  userId: "test",
  items: groceryItems,
};

describe("Grocery list component", () => {
  it("GroceryList render data from redux", () => {
    renderWithProviders(<GroceryList />, {
      preloadedState: {
        grocery: dummyItems,
      },
    });

    expect(screen.getAllByText(/to buy/i)).toBeInTheDocument();
  });

  it("GroceryList display emty item statement when data is empty", () => {
    renderWithProviders(<GroceryList />, {
      preloadedState: {
        grocery: emptyItems,
      },
    });

    expect(
      screen.getByText(/There is no grocery item here./i),
    ).toBeInTheDocument();
  });
});
