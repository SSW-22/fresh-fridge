import { render, screen } from "@testing-library/react";
import Listitem from "../ListItem";

describe("List item component in inventory", () => {
  it("list Item component render", () => {
    render(
      <Listitem
        item={{
          category: "3",
          expireDate: "2022-12-15",
          id: "861148dd-7051-4b80-9f0e-bf4fe8ce8ea6",
          name: "test3",
          qty: 2,
        }}
      />,
    );

    expect(screen.getByText("test3")).toBeInTheDocument();
    expect(screen.getByText("2 in stock")).toBeInTheDocument();
  });

  it("list Item component expiry date test 'expired'", () => {
    render(
      <Listitem
        item={{
          category: "3",
          expireDate: "2022-12-01",
          id: "861148dd-7051-4b80-9f0e-bf4fe8ce8ea6",
          name: "test3",
          qty: 2,
        }}
      />,
    );

    expect(screen.getByText("Expired")).toBeInTheDocument();
  });
});

describe("List item component in grocery", () => {
  it("list Item component render", () => {
    render(
      <Listitem
        item={{
          id: "861148dd-7051-4b80-9f0e-bf4fe8ce8ea6",
          name: "test3",
          qty: 2,
        }}
      />,
    );

    expect(screen.getByText("test3")).toBeInTheDocument();
    expect(screen.getByText("2 to buy")).toBeInTheDocument();
    expect(screen.queryByTestId("expiry-date")).not.toBeInTheDocument();
  });
});
