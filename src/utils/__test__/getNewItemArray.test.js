import getNewItemArray from "../getNewItemArray";

describe("array function test", () => {
  it("add new item test", () => {
    const previousItems = [
      { id: "1", name: "test1", qty: 1 },
      { id: "2", name: "test2", qty: 1 },
    ];
    const newItem = { id: "3", name: "test3", qty: 1 };
    expect(getNewItemArray(previousItems, newItem)).toEqual([
      { id: "1", name: "test1", qty: 1 },
      { id: "2", name: "test2", qty: 1 },
      { id: "3", name: "test3", qty: 1 },
    ]);
  });

  it("edit exist item test", () => {
    const previousItems = [
      { id: "1", name: "test1", qty: 1 },
      { id: "2", name: "test2", qty: 1 },
    ];
    const newItem = { id: "1", name: "test3", qty: 3 };
    expect(getNewItemArray(previousItems, newItem)).toEqual([
      { id: "1", name: "test3", qty: 3 },
      { id: "2", name: "test2", qty: 1 },
    ]);
  });

  it("delete exist item test", () => {
    const previousItems = [
      { id: "1", name: "test1", qty: 1 },
      { id: "2", name: "test2", qty: 1 },
    ];
    const newItem = { id: "1", name: "", qty: 0 };
    expect(getNewItemArray(previousItems, newItem)).toEqual([
      { id: "2", name: "test2", qty: 1 },
    ]);
  });
});
