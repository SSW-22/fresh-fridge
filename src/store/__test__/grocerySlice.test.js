import groceryReducer, { groceryActions } from "../grocerySlice";

describe("grocery reducer test", () => {
  it("initial", () => {
    expect(groceryReducer(undefined, { type: undefined })).toEqual({
      userId: "",
      items: [],
    });
  });

  it("userId should be added when user login to browser", () => {
    const previousState = { userId: "", items: [] };

    expect(
      groceryReducer(previousState, groceryActions.addUser("testid")),
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

    expect(groceryReducer(previousState, groceryActions.deleteUser())).toEqual({
      userId: "",
      items: [],
    });
  });

  it("get exact item value", () => {
    const previousState = { userId: "test", items: [] };

    expect(
      groceryReducer(
        previousState,
        groceryActions.addItem({
          id: "asdf",
          name: "test",
          qty: 5,
        }),
      ),
    ).toEqual({
      userId: "test",
      items: [{ id: "asdf", name: "test", qty: 5 }],
    });
  });

  it("get exact item value when edit item", () => {
    const previousState = {
      userId: "test",
      items: [
        {
          id: "asdf",
          name: "test before",
          qty: 1,
        },
      ],
    };

    expect(
      groceryReducer(
        previousState,
        groceryActions.addItem({
          id: "asdf",
          name: "test after",
          qty: 5,
        }),
      ),
    ).toEqual({
      userId: "test",
      items: [{ id: "asdf", name: "test after", qty: 5 }],
    });
  });

  it("get exact item value when delete item", () => {
    const previousState = {
      userId: "test",
      items: [
        {
          id: "1",
          name: "test 1",
          qty: 1,
        },
        {
          id: "2",
          name: "test 2",
          qty: 1,
        },
      ],
    };

    expect(
      groceryReducer(previousState, groceryActions.deleteItem("1")),
    ).toEqual({
      userId: "test",
      items: [
        {
          id: "2",
          name: "test 2",
          qty: 1,
        },
      ],
    });
  });
});
