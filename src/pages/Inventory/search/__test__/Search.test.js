import { screen, render, fireEvent } from "@testing-library/react";
import Search from "../Search";

describe("Search in inventory component", () => {
  it("search component render", () => {
    render(<Search />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("do not display search bar when btn not clicked", () => {
    render(<Search />);

    expect(screen.queryByText(/search all food/i)).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked", async () => {
    render(<Search category="0" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search all food/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-btn")).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked under freezer prop", async () => {
    render(<Search category="2" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search freezer/i),
    ).toBeInTheDocument();
  });

  it("close search bar when back btn clicked", async () => {
    render(<Search />);
    fireEvent.click(screen.getByTestId("search-btn"));
    fireEvent.click(screen.getByTestId("back-btn"));

    expect(screen.queryByText(/search all food/i)).not.toBeInTheDocument();
  });
});
