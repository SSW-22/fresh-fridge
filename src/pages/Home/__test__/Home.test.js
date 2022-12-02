import { screen } from "@testing-library/react";
import Home from "../Home";
import renderWithProviders from "../../../utils/test-utils";

describe("Home component test", () => {
  it("Home component render loading", async () => {
    renderWithProviders(<Home />);

    const homeText = await screen.findByText(/loading/i);
    expect(homeText).toBeInTheDocument();
  });
});
