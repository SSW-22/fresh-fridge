import inventorySlice, {
  inventoryActions,
} from "../../../../store/inventorySlice";

describe("Inventory List", () => {
  it("should render add item form when 'add item btn' clicked", async () => {
    // render(<Inventory />);
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
          name: "hello",
        },
      ],
    });
  });
});
