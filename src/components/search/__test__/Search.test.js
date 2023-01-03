import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithProviders from "../../../utils/test-utils";
import Search from "../Search";
import apiCall from "../../../api/recipe-api";

jest.mock("../../../api/recipe-api", () => jest.fn());

describe("Search in inventory component", () => {
  afterEach(jest.clearAllMocks);
  it("search component render", () => {
    renderWithProviders(<Search />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("do not display search bar when btn not clicked", () => {
    renderWithProviders(<Search />);

    expect(screen.queryByText(/search all food/i)).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked", async () => {
    renderWithProviders(<Search category="0" type="inventory" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search all food/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-btn")).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked under freezer prop", async () => {
    renderWithProviders(<Search category="2" type="inventory" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search freezer/i),
    ).toBeInTheDocument();
  });

  it("close search bar when back btn clicked", async () => {
    const setSearchString = jest.fn();
    renderWithProviders(
      <Search setSearchString={setSearchString} type="inventory" />,
    );
    fireEvent.click(screen.getByTestId("search-btn"));
    fireEvent.click(screen.getByTestId("back-btn"));

    expect(screen.queryByText(/search all food/i)).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked in Recipe", async () => {
    renderWithProviders(<Search category="0" type="recipe" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search recipe with/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-btn")).not.toBeInTheDocument();
  });

  it("display search bar when btn clicked in saved recipes", async () => {
    renderWithProviders(<Search category="1" type="recipe" />);
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/search saved recipes/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-btn")).not.toBeInTheDocument();
  });

  it("search btn get data from api call in recipe component", async () => {
    const setSearchString = jest.fn();
    apiCall.mockImplementation(() => [
      {
        canonical_id: 1,
        name: "name",
        instructions: "instructions",
        video_url: "video_url",
        sections: "sections",
      },
    ]);
    renderWithProviders(
      <Search category="0" setSearchString={setSearchString} type="recipe" />,
    );

    fireEvent.click(screen.getByTestId("search-btn"));
    fireEvent.change(screen.getByPlaceholderText("Search recipe with"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("submit-test"));

    expect(screen.getByPlaceholderText("Search recipe with")).toHaveValue(
      "test",
    );
    await waitFor(() => {
      expect(apiCall).toHaveBeenCalled();
    });
  });
});
