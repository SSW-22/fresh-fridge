import { fireEvent, screen } from "@testing-library/react";
import EditMoveDelete from "../EditMoveDelete";
import renderWithProviders from "../../../utils/test-utils";

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
});
