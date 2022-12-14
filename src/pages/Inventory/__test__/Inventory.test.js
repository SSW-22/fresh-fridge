import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../../../utils/test-utils";
import Inventory from "../Inventory";
import dummyData from "../../../../__dummy__/dummyData";

const initialItems = {
  userId: "test",
  items: dummyData,
};

describe("Inventory page", () => {
  it("should render add item form when 'add item btn' clicked", async () => {
    renderWithProviders(<Inventory />);
    const addItemBtn = screen.getByRole("button", { name: /Add item/i });

    fireEvent.click(addItemBtn);
    const addItemForm = screen.getByTestId("adding-item-form");
    expect(addItemForm).toBeInTheDocument();
  });

  it("should render inventory list page when 'x' clicked from add item form", async () => {
    renderWithProviders(<Inventory />);
    const addItemBtn = screen.getByRole("button", { name: /Add item/i });
    fireEvent.click(addItemBtn);
    const closeBtn = screen.getByTestId("closeBtn");
    fireEvent.click(closeBtn);
    const listItems = screen.getByTestId("inventory-component");
    expect(listItems).toBeInTheDocument();
  });

  it("display fridge,freezer and pantry when click dropdown btn under all food state", async () => {
    renderWithProviders(<Inventory />);

    fireEvent.click(screen.getByTestId("dropdown-btn"));
    expect(
      await screen.findByRole("button", { name: /fridge/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /freezer/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /pantry/i }),
    ).toBeInTheDocument();
  });
  it("display all food,freezer and pantry when click dropdown btn under Fridge state", async () => {
    renderWithProviders(<Inventory />);

    fireEvent.click(screen.getByTestId("dropdown-btn"));
    fireEvent.click(screen.getByRole("button", { name: /fridge/i }));
    expect(
      await screen.findByRole("button", { name: /all food/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /freezer/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /pantry/i }),
    ).toBeInTheDocument();
  });
  it("display fridge,freezer and all food when click dropdown btn under Pantry state", async () => {
    renderWithProviders(<Inventory />);

    fireEvent.click(screen.getByTestId("dropdown-btn"));
    fireEvent.click(screen.getByRole("button", { name: /pantry/i }));
    expect(
      await screen.findByRole("button", { name: /fridge/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /freezer/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /all food/i }),
    ).toBeInTheDocument();
  });
  it("display fridge,all food and pantry when click dropdown btn under freezer state", async () => {
    renderWithProviders(<Inventory />);

    fireEvent.click(screen.getByTestId("dropdown-btn"));
    fireEvent.click(screen.getByRole("button", { name: /freezer/i }));
    expect(
      await screen.findByRole("button", { name: /fridge/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /all food/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /pantry/i }),
    ).toBeInTheDocument();
  });

  it("display search text on input field", async () => {
    renderWithProviders(<Inventory />);
    fireEvent.click(screen.getByTestId("search-btn"));
    fireEvent.change(await screen.findByRole("textbox"), {
      target: { value: "asdf" },
    });
    expect(await screen.findByRole("textbox")).toHaveValue("asdf");
  });

  it("display edit move delete btns when list is clicked", async () => {
    renderWithProviders(<Inventory category="0" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });
    fireEvent.click(screen.getByText(/apple/i));

    expect(await screen.findByText("Edit")).toBeInTheDocument();
    expect(await screen.findByText("Move to")).toBeInTheDocument();
    expect(await screen.findByText("Delete")).toBeInTheDocument();
  });

  it("do not display edit move delete btns before list is clicked", async () => {
    renderWithProviders(<Inventory category="0" searchString="" />, {
      preloadedState: {
        inventory: initialItems,
      },
    });

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Move to")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });
});
