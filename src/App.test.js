import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("nav", () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent("Inventory");
    expect(container).toHaveTextContent("Grocery");
    expect(container).toHaveTextContent("Recipe");
    expect(container).toHaveTextContent("Profile");
  });
});
