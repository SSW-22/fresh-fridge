import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

jest.mock("react-redux");

function Router() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

describe("Home component test", () => {
  it("Home component render", () => {
    render(<Router />);

    const homeText = screen.getByText(/fresh fridge/i);
    expect(homeText).toBeInTheDocument();
  });

  it("sign in button render", () => {
    render(<Router />);

    const homeText = screen.getByText(/sign in with your google account/i);
    expect(homeText).toBeInTheDocument();
  });
});
