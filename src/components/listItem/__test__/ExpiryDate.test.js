import { screen } from "@testing-library/react";
import ExpiryDate from "../ExpiryDate";
import renderWithProviders from "../../../utils/test-utils";

describe("expiry date component", () => {
  it("calculate expired date and display the item is expired", () => {
    renderWithProviders(<ExpiryDate date="2022-12-01" />);

    expect(screen.getByText("Expired")).toBeInTheDocument();
  });
});
