import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../SignIn";

jest.mock("react-redux");

describe("Sign in test", () => {
  it("Sign in render", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );

    const signInText = screen.getByText(/sign in with your google account/i);
    expect(signInText).toBeInTheDocument();
  });
});
