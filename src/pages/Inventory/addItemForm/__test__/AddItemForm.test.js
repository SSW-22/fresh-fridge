import { screen, fireEvent } from "@testing-library/react";
import Inventory from "../../Inventory";
import renderWithProviders from "../../../../utils/test-utils";

describe("Inventory List", () => {
  it("validation not pass when empty input found after submit", async () => {
    // ????
    renderWithProviders(<Inventory />);
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));

    expect(screen.queryByText("Please enter a name").classList).toContain(
      "err-msg-active",
    );
    expect(screen.queryByText("Please enter a quantity").classList).toContain(
      "err-msg-active",
    );

    expect(screen.queryByText("Please select a location").classList).toContain(
      "err-msg-active",
    );
  });
  it("validation pass", async () => {
    renderWithProviders(<Inventory />);
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "apple" },
    });

    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 4 },
    });

    // fireEvent.click(screen.getByText(/fridge/i));
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));

    expect(screen.queryByText("Please enter a name").classList).not.toContain(
      "err-msg-active",
    );
    expect(
      screen.queryByText("Please enter a quantity").classList,
    ).not.toContain("err-msg-active");

    // expect(
    //   screen.queryByText("Please select a location").classList,
    // ).not.toContain("err-msg-active");
  });
});
