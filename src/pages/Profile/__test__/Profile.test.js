import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/index";
import Profile from "../Profile";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("Profile component test", () => {
  it("Profile component render loading", () => {
    render(<Profile />);

    const profileText = screen.getByText(/Expiry date reminders/i);
    expect(profileText).toBeInTheDocument();
  });
});
