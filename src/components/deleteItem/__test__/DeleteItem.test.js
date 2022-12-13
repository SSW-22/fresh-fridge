import React from "react";
import { screen } from "@testing-library/react";
import DeleteItem from "../DeleteItem";
import renderWithProviders from "../../../utils/test-utils";

describe("delete item", () => {
  it("delete item component render when delete btn is clicked", () => {
    const setStateMock = jest.fn();
    const useStateMock = (useState) => [useState, setStateMock];

    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    renderWithProviders(<DeleteItem setOpenForm={setStateMock} />);

    expect(screen.getByTestId("delete-test")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByTestId("confirm-btn")).toBeInTheDocument();
  });
});
