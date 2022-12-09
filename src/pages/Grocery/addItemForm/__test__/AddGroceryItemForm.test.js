import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import AddGroceryItemForm from "../AddGroceryItemForm";

describe("add form from grocery component", () => {
  it("render add form", () => {
    renderWithProviders(<AddGroceryItemForm />);

    expect(screen.getByTestId("add-grocery-form")).toBeInTheDocument();
  });

  it("close add form when x clicked", async () => {
    const setStateMock = jest.fn();
    const useStateMock = (useState) => [useState, setStateMock];

    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    renderWithProviders(<AddGroceryItemForm setOpenForm={setStateMock} />);

    fireEvent.click(screen.getByTestId("close-btn"));
    expect(setStateMock).toHaveBeenCalledWith(false);
  });
});
