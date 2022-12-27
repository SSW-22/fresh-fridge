import { screen, render, fireEvent } from "@testing-library/react";
import Category from "../Category";

describe("Category bar in Inventory page", () => {
  it("Category render", () => {
    render(<Category category="0" type="inventory" />);
    expect(screen.getByText(/all food/i)).toBeInTheDocument();
  });

  it("Category dropdown do not render before click btn", () => {
    render(<Category category="0" type="inventory" />);

    expect(screen.queryByTestId(/dropdown-component/i)).not.toBeInTheDocument();
  });

  it("Category dropdown render when click btn", async () => {
    render(<Category type="inventory" />);
    fireEvent.click(screen.getByRole("button"));

    expect(
      await screen.findByTestId(/dropdown-component/i),
    ).toBeInTheDocument();
  });
});
