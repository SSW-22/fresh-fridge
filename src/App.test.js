import { render } from "@testing-library/react";

import App from "./App";

jest.mock("react-redux");

describe("App", () => {
  it("nav not display when user not log in", () => {
    const { container } = render(<App />);
    expect(container).not.toHaveTextContent("Inventory");
    expect(container).not.toHaveTextContent("Grocery");
    expect(container).not.toHaveTextContent("Recipe");
    expect(container).not.toHaveTextContent("Profile");
  });
});
