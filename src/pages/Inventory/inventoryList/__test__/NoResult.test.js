import { render, screen } from "@testing-library/react";
import NoResult from "../NoResult";

describe("NotFound componet", () => {
  it("Not Found component render", () => {
    render(<NoResult />);
    expect(screen.getByText(/no result found/i)).toBeInTheDocument();
  });
});
