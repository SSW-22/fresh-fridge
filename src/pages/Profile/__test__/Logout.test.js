import { screen } from "@testing-library/react";
import Logout from "../Profile";
import renderWithProviders from "../../../utils/test-utils";

describe("test logout btn", () => {
  it("Profile component logout btn render test", () => {
    renderWithProviders(<Logout />);

    const btnText = screen.getByRole("button", { name: /logout/i });
    expect(btnText).toBeInTheDocument();
  });
});
