import { fireEvent, screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import InputForm from "../InputForm";

import { groceryItems } from "../../../../utils/dummyInventoryStore";

const dummyItems = {
  userId: "test",
  items: groceryItems,
};

describe("grocery edit", () => {
  it("edit form render", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} selectedId="1" />, {
      preloadedState: {
        grocery: dummyItems,
      },
    });

    expect(screen.queryByText("Please enter a name").classList).not.toContain(
      "err-msg-active",
    );
    expect(
      screen.queryByText("Please enter a quantity").classList,
    ).not.toContain("err-msg-active");
  });

  it("change name to invalid after edit form render", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} selectedId="1" />, {
      preloadedState: {
        grocery: dummyItems,
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });

    expect(screen.queryByText("Please enter a name").classList).toContain(
      "err-msg-active",
    );
    expect(
      screen.queryByText("Please enter a quantity").classList,
    ).not.toContain("err-msg-active");
  });

  it("change quantity to invalid after edit form render", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} selectedId="1" />, {
      preloadedState: {
        grocery: dummyItems,
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });

    expect(screen.queryByText("Please enter a name").classList).not.toContain(
      "err-msg-active",
    );
    expect(screen.queryByText("Please enter a quantity").classList).toContain(
      "err-msg-active",
    );
  });

  it("change both name and quantity to invalid after edit form render", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} selectedId="1" />, {
      preloadedState: {
        grocery: dummyItems,
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });

    expect(screen.queryByText("Please enter a name").classList).toContain(
      "err-msg-active",
    );
    expect(screen.queryByText("Please enter a quantity").classList).toContain(
      "err-msg-active",
    );
  });
});

describe("grocery form", () => {
  it("form submit when submit btn is clicked", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "qwe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 1 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    // fireEvent.submit(screen.getByTestId("form-test"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("invalid msg is displayed when only name feild is invalid", async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 1 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    // fireEvent.submit(screen.getByTestId("form-test"));

    expect(screen.queryByText("Please enter a name").classList).toContain(
      "err-msg-active",
    );
    expect(
      screen.queryByText("Please enter a quantity").classList,
    ).not.toContain("err-msg-active");
  });

  it("invalid msg is displayed when only quantity feild is invalid", async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    // fireEvent.submit(screen.getByTestId("form-test"));

    expect(screen.queryByText("Please enter a name").classList).not.toContain(
      "err-msg-active",
    );
    expect(screen.queryByText("Please enter a quantity").classList).toContain(
      "err-msg-active",
    );
  });

  it("invalid msg is displayed when both name and quantity feilds are invalid", async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));
    // fireEvent.submit(screen.getByTestId("form-test"));

    expect(screen.queryByText("Please enter a name").classList).toContain(
      "err-msg-active",
    );
    expect(screen.queryByText("Please enter a quantity").classList).toContain(
      "err-msg-active",
    );
  });
});

describe("after invalid form submit", () => {
  it("valid form input", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "qwe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 1 },
    });

    expect(screen.queryByText("Please enter a name").classList).not.toContain(
      "err-msg-active",
    );
    expect(
      screen.queryByText("Please enter a quantity").classList,
    ).not.toContain("err-msg-active");
  });

  it("in valid form input", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });

    expect(screen.queryByText("Please enter a name").classList).toContain(
      "err-msg-active",
    );
    expect(screen.queryByText("Please enter a quantity").classList).toContain(
      "err-msg-active",
    );
  });

  it("only valid name input", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "qwe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });

    expect(screen.queryByText("Please enter a name").classList).not.toContain(
      "err-msg-active",
    );
    expect(screen.queryByText("Please enter a quantity").classList).toContain(
      "err-msg-active",
    );
  });

  it("only valid quantity input", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithProviders(<InputForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 0 },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add item/i }));

    fireEvent.change(screen.getByPlaceholderText("Add name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Add quantity"), {
      target: { value: 1 },
    });

    expect(screen.queryByText("Please enter a name").classList).toContain(
      "err-msg-active",
    );
    expect(
      screen.queryByText("Please enter a quantity").classList,
    ).not.toContain("err-msg-active");
  });
});
