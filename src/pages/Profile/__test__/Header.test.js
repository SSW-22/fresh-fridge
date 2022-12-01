import { render, screen } from "@testing-library/react";
import Header from "../Header";

it("Profile componetn heading test", () => {
  render(<Header />);

  const headerText = screen.getByText(/Settings/i);
  expect(headerText).toBeInTheDocument();
});
