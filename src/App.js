import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Inventory from "./pages/Inventory/Inventory";
import Grocery from "./pages/Grocery/Grocery";
import Recipe from "./pages/Recipe/Recipe";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
