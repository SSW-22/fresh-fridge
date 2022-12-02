import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import InventoryList from "../InventoryList";
import dummyData from "../../../../../__dummy__/dummyData";

describe("Inventory List", () => {
  it("render Inventory List", async () => {
    const initialItems = {
      userId: "test",
      items: dummyData,
    };
    renderWithProviders(<InventoryList />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    const elements = screen.getByText("orange");
    // console.log(getByText);
    expect(elements).toHaveTextContent("orange");
  });
});
