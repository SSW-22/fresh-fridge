import { screen, fireEvent } from "@testing-library/react";
// import user from "@testing-library/user-event";
import Inventory from "../../Inventory";
import renderWithProviders from "../../../../utils/test-utils";

// function getItemName() {
//   return screen.getByRole("textbox", {
//     name: /name/i,
//   });
// }

// function getItemQty() {
//   return screen.getByText(/quantity/i);
// }

// function getAddTo() {
//   return screen.getByRole("radio", {
//     name: /fridge/i,
//   });
// }

describe("Inventory List", () => {
  it("submit available when all inputs pass validation", async () => {
    // ????
    renderWithProviders(<Inventory />);
    // user.click(screen.getByRole("button", { name: /Add item/i }));
    // user.type(getItemName(), "apple");
    // user.type(getItemQty(), 5);
    // user.click(getAddTo());
    // user.click(screen.getByTestId("submitBtn"));

    // const newItem = await screen.findByText("apple");
    // expect(newItem).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "apple" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 5 },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));

    expect(screen.queryByText("Please enter a name").classList).not.toContain(
      "err-msg-active",
    );
    expect(
      screen.queryByText("Please enter a quantity").classList,
    ).not.toContain("err-msg-active");

    expect(
      screen.queryByText("Please select a location").classList,
    ).not.toContain("err-msg-active");
  });
});
