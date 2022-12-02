import inventorySlice, {
  inventoryActions,
} from "../../../../store/inventorySlice";

// import AddItemForm from "../AddItemForm";
// import renderWithProviders from "../../../../utils/test-utils";

describe("Inventory List", () => {
  it("should render add item form when 'add item btn' clicked", async () => {
    // render(<Inventory />);
    // const addItemBtn = screen.getByRole("button", { name: /add item/i });
    // fireEvent.click(addItemBtn);
    // const addItemForm = screen.getByTestId("adding-item-form");
    // expect(addItemForm).toBeInTheDocument();
  });

  it("should added item when 'add item btn' clicked", async () => {
    const previousState = { userId: "", items: [] };

    expect(
      inventorySlice(
        previousState,
        inventoryActions.addItem({ name: "hello" }),
      ),
    ).toEqual({
      userId: "",
      items: [
        {
          // id: 1,
          name: "hello",
          // expireDate: "2022-12-20",
          // qty: 2,
          // category: "inventory",
        },
      ],
    });

    // renderWithProviders(<AddItemForm />);
    // const addBtn = screen.getByRole("button", { name: /add item/i });
    // fireEvent.click(addBtn);
  });
});
