import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);
describe("App", () => {
  it("nav not display when user not log in", async () => {
    render(<App />);
    const title = await screen.findByText(/fresh fridge/i);

    expect(title).toBeInTheDocument();
  });
});
