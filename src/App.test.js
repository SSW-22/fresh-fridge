import { screen } from "@testing-library/react";
import renderWithProviders from "./utils/test-utils";
import App from "./App";

const initialUser = {
  token: "token",
  uid: "uid",
  isLogIn: true,
};

describe("App", () => {
  it("nav not display when user not log in", async () => {
    renderWithProviders(<App />);

    const title = await screen.findByText(/fresh fridge/i);
    const nav = screen.queryByRole(/nav/i);
    expect(title).toBeInTheDocument();
    expect(nav).not.toBeInTheDocument();
  });

  it("nav display when user log in", () => {
    renderWithProviders(<App />, {
      preloadedState: {
        user: initialUser,
      },
    });

    const title = screen.queryByText(/fresh fridge/i);
    const nav = screen.getByRole(/nav/i);
    expect(title).not.toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });
});
