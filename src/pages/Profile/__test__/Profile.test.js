import { screen } from "@testing-library/react";
import Profile from "../Profile";
import renderWithProviders from "../../../utils/test-utils";

describe("Profile component test", () => {
  it("Profile component render loading", () => {
    renderWithProviders(<Profile />);

    const profileText = screen.getByText(/Expiry date reminders/i);
    expect(profileText).toBeInTheDocument();
  });
});
