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
    render(<Search category="0" type="inventory" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search all food/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-btn")).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked under freezer prop", async () => {
    render(<Search category="2" type="inventory" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search freezer/i),
    ).toBeInTheDocument();
  });

  it("close search bar when back btn clicked", async () => {
    const setSearchString = jest.fn();
    render(<Search setSearchString={setSearchString} type="inventory" />);
    fireEvent.click(screen.getByTestId("search-btn"));
    fireEvent.click(screen.getByTestId("back-btn"));

    expect(screen.queryByText(/search all food/i)).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked in Recipe", async () => {
    render(<Search category="0" type="recipe" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search recipe with/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-btn")).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked in saved recipes", async () => {
    render(<Search category="1" type="recipe" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search saved recipes/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-btn")).not.toBeInTheDocument();
  });
});
