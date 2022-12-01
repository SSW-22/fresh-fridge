import { render as rtlRender, screen } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "../Home";
import store from "../../../store/index";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("Home component test", () => {
  it("Home component render loading", async () => {
    render(<Home />);

    const homeText = await screen.findByText(/loading/i);
    expect(homeText).toBeInTheDocument();
  });
});
