import { fireEvent, screen } from "@testing-library/react";
import Logout from "../Profile";
import renderWithProviders from "../../../utils/test-utils";

describe("test logout btn", () => {
  it("Profile component logout btn render test", () => {
    renderWithProviders(<Logout />);

    const btnText = screen.getByText(/Logout/i);
    expect(btnText).toBeInTheDocument();
  });

  it("back to login page when btn clicked", async () => {
    renderWithProviders(<Logout />);

    const btn = screen.getByRole("button", { name: /Logout/i });
    fireEvent.click(btn);
    expect(await screen.findByText(/fresh fridge/i)).toBeInTheDocument();
  });
});
