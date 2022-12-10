import { render, screen } from "@testing-library/react";
import ExpiryDate from "../ExpiryDate";

describe("expiry date component", () => {
  it("calculate expired date and display the item is expired", () => {
    render(<ExpiryDate date="2022-12-01" />);

    expect(screen.getByText("Expired")).toBeInTheDocument();
  });
});
