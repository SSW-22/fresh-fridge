import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Inventory from "../../pages/Inventory/Inventory";
import Grocery from "../../pages/Grocery/Grocery";
import Recipe from "../../pages/Recipe/Recipe";
import Profile from "../../pages/Profile/Profile";
import Navbar from "../Navbar";

function MockRouter() {
  return (
    <MemoryRouter initialEntries={["/inventory"]}>
      <Navbar />
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Nav bar", () => {
  it("link to Inventory when Inventory link is clicked", async () => {
    render(<MockRouter />);

    fireEvent.click(screen.getByText("Inventory"));

    const ActiveComponent = await screen.findByTestId("inventory-component");
    expect(ActiveComponent).toBeInTheDocument();
  });

  it("link to Grocery when Grocery link is clicked", async () => {
    render(<MockRouter />);

    fireEvent.click(screen.getByText("Grocery"));

    const ActiveComponent = await screen.findByTestId("grocery-component");
    expect(ActiveComponent).toBeInTheDocument();
  });

  it("link to Recipe when Recipe link is clicked", async () => {
    render(<MockRouter />);

    fireEvent.click(screen.getByText("Recipe"));

    const ActiveComponent = await screen.findByTestId("recipe-component");
    expect(ActiveComponent).toBeInTheDocument();
  });

  it("link to Profile when Profile link is clicked", async () => {
    render(<MockRouter />);

    fireEvent.click(screen.getByText("Profile"));

    const ActiveComponent = await screen.findByTestId("profile-component");
    expect(ActiveComponent).toBeInTheDocument();
  });
});
