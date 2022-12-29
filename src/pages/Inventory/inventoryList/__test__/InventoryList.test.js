import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import InventoryList from "../InventoryList";
import dummyData from "../../../../../__dummy__/dummyData";

const initialItems = {
  userId: "test",
  items: dummyData,
};

const emptyItems = {
  userId: "test",
  items: [],
};

describe("Inventory list display list by category", () => {
  it("display every list when 'all food' is selected in catetory", () => {
    renderWithProviders(<InventoryList category="0" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });

    expect(screen.getByText(/fridge category/i)).toBeInTheDocument();
    expect(screen.getByText(/freezer category/i)).toBeInTheDocument();
    expect(screen.getByText(/pantry category/i)).toBeInTheDocument();
    expect(screen.getByText("Fridge")).toBeInTheDocument();
    expect(screen.getByText("Freezer")).toBeInTheDocument();
    expect(screen.getByText("Pantry")).toBeInTheDocument();
  });
  it("display fridge list when 'fridge' is selected in catetory", () => {
    renderWithProviders(<InventoryList category="1" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });

    expect(screen.getByText(/fridge category/i)).toBeInTheDocument();
    expect(screen.queryByText(/freezer category/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pantry category/i)).not.toBeInTheDocument();
  });
  it("display freezer list when 'freezer' is selected in catetory", () => {
    renderWithProviders(<InventoryList category="2" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });

    expect(screen.queryByText(/fridge category/i)).not.toBeInTheDocument();
    expect(screen.getByText(/freezer category/i)).toBeInTheDocument();
    expect(screen.queryByText(/pantry category/i)).not.toBeInTheDocument();
  });
  it("display pantry list when 'pantry' is selected in catetory", () => {
    renderWithProviders(<InventoryList category="3" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });

    expect(screen.queryByText(/fridge category/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/freezer category/i)).not.toBeInTheDocument();
    expect(screen.getByText(/pantry category/i)).toBeInTheDocument();
  });
});

describe("Inventory List", () => {
  it("render Inventory List", async () => {
    renderWithProviders(<InventoryList category="0" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    const elements = screen.getByText("orange");
    expect(elements).toHaveTextContent("orange");
  });

  it("No food message when there are no item in the redux store", () => {
    renderWithProviders(<InventoryList category="0" searchString="" />, {
      preloadedState: {
        inventory: emptyItems,
      },
    });
    expect(screen.getByTestId("empty-state-test")).toBeInTheDocument();
  });

  it("No message when item exists in the redux store", () => {
    renderWithProviders(<InventoryList category="0" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    expect(screen.queryByTestId("empty-state-test")).not.toBeInTheDocument();
  });
});

describe("item not found message in inventory component", () => {
  it("Item not found message when there are no search item in the redux store", () => {
    renderWithProviders(<InventoryList category="0" searchString="xxi" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    expect(screen.getByText(/No results found./i)).toBeInTheDocument();
  });

  it("Item not found message when there are no search item in the fridge store", () => {
    renderWithProviders(<InventoryList category="1" searchString="freezer" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    expect(screen.getByText(/No results found./i)).toBeInTheDocument();
  });

  it("Item not found message when there are no search item in the freezer store", () => {
    renderWithProviders(<InventoryList category="2" searchString="banana" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    expect(screen.getByText(/No results found./i)).toBeInTheDocument();
  });

  it("Item not found message when there are no search item in the pantry store", () => {
    renderWithProviders(<InventoryList category="3" searchString="banana" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    expect(screen.getByText(/No results found./i)).toBeInTheDocument();
  });
});
