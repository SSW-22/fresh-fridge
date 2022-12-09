import { render, screen } from "@testing-library/react";
import EditMoveDeleteBtn from "../EditMoveDeleteBtn";

describe("three btn wrapper", () => {
  it("render three btns", () => {
    render(<EditMoveDeleteBtn />);

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Move to" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
