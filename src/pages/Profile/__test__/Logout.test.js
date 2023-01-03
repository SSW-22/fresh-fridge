import { screen } from "@testing-library/react";
import Logout from "../Profile";
import renderWithProviders from "../../../utils/test-utils";

describe("test logout btn", () => {
  it("logout component render", () => {
    renderWithProviders(<Logout />);
    expect(screen.getByTestId("logout-test")).toBeInTheDocument();
  });
});
