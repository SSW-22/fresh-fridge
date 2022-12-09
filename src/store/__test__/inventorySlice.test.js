import inventoryReducer, { inventoryActions } from "../inventorySlice";

describe("Inventory List", () => {
  test("initial", () => {
    expect(inventoryReducer(undefined, { type: undefined })).toEqual({
      userId: "",
      items: [],
    });
  });

  it("userId should be added when user login to browser", () => {
    const previousState = { userId: "", items: [] };

    expect(
      inventoryReducer(previousState, inventoryActions.addUser("testid")),
    ).toEqual({
      userId: "testid",
      items: [],
    });
  });

  it("userId should be deleted when user logout to browser", () => {
    const previousState = {
      userId: "test",
      items: [
        {
          id: "asdf",
          name: "hello",
          expireDate: "2022-12-30",
          qty: 5,
          category: "inventory",
        },
      ],
    };

    expect(
      inventoryReducer(previousState, inventoryActions.deleteUser()),
    ).toEqual({
      userId: "",
      items: [],
    });
  });

  it("should added item when 'add item btn' clicked", async () => {
    const previousState = { userId: "", items: [] };

    expect(
      inventoryReducer(
        previousState,
        inventoryActions.addItem({
          id: "asdf",
          name: "hello",
          expireDate: "2022-12-30",
          qty: 5,
          category: "inventory",
        }),
      ),
    ).toEqual({
      userId: "",
      items: [
        {
          id: "asdf",
          name: "hello",
          expireDate: "2022-12-30",
          qty: 5,
          category: "inventory",
        },
      ],
    });
  });
});
