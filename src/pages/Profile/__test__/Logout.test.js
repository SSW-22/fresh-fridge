import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Logout from "../Profile";
import store from "../../../store/index";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("test logout btn", () => {
  it("Profile component logout btn render test", () => {
    render(<Logout />);

    const btnText = screen.getByText(/Logout/i);
    expect(btnText).toBeInTheDocument();
  });
});
