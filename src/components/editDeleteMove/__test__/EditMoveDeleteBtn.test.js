import { fireEvent, screen } from "@testing-library/react";
import EditMoveDelete from "../EditMoveDelete";
import renderWithProviders from "../../../utils/test-utils";
import { groceryItems } from "../../../utils/dummyInventoryStore";

const initialItems = {
  userId: "test",
  items: groceryItems,
};
describe("edit move delete wrapper", () => {
  it("render three btns", () => {
    renderWithProviders(<EditMoveDelete />);

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Move to" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("render edit form when edit btn is clicked", async () => {
    renderWithProviders(<EditMoveDelete selectedId="id" />);
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(await screen.findByText("Edit item")).toBeInTheDocument();
  });

  it("render delete form when delete btn is clicked", async () => {
    renderWithProviders(<EditMoveDelete selectedId="1" />);
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(await screen.findByText("Delete item")).toBeInTheDocument();
  });

  it("close delete form when close btn is clicked", async () => {
    renderWithProviders(<EditMoveDelete selectedId="1" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(await screen.findByText("Delete item")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-btn"));
    expect(screen.queryByText("Delete item")).not.toBeInTheDocument();
  });
});
