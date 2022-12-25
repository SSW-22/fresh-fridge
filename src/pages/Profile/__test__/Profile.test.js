import { fireEvent, screen } from "@testing-library/react";
import Profile from "../Profile";
import renderWithProviders from "../../../utils/test-utils";

describe("Profile component test", () => {
  it("Profile component render loading", () => {
    renderWithProviders(<Profile />);

    const profileText = screen.getByText(/Expiry date reminders/i);
    expect(profileText).toBeInTheDocument();
  });

  it("test input number", () => {
    renderWithProviders(<Profile />);
    fireEvent.change(screen.getByTestId("number-input-test"), {
      target: { value: 5 },
    });
    expect(screen.getByTestId("number-input-test").value).toBe("5");
  });

  it("test invalid input", () => {
    renderWithProviders(<Profile />);
    fireEvent.change(screen.getByTestId("number-input-test"), {
      target: { value: "test" },
    });
    expect(screen.getByTestId("number-input-test").value).toBe("");
  });

  it("test increase btn clicked", async () => {
    renderWithProviders(<Profile />);
    fireEvent.click(screen.getByTestId("increase-btn"));
    fireEvent.click(screen.getByTestId("increase-btn"));
    expect(await screen.getByTestId("number-input-test").value).toBe("2");
  });

  it("test decrease btn clicked", async () => {
    renderWithProviders(<Profile />);
    fireEvent.change(screen.getByTestId("number-input-test"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByTestId("decrease-btn"));
    fireEvent.click(screen.getByTestId("decrease-btn"));
    expect(await screen.getByTestId("number-input-test").value).toBe("2");
  });

  it("test decrease btn clicked from 0 value", async () => {
    renderWithProviders(<Profile />);
    fireEvent.click(screen.getByTestId("decrease-btn"));
    fireEvent.click(screen.getByTestId("decrease-btn"));
    expect(await screen.getByTestId("number-input-test").value).toBe("");
  });
});
