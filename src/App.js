import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Inventory from "./pages/Inventory/Inventory";
import Grocery from "./pages/Grocery/Grocery";
import Recipe from "./pages/Recipe/Recipe";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";

function App() {
  const isLogin = useSelector((state) => state.user.isLogIn);
  return (
    <div className="App">
      <Router>
        {isLogin && <Navbar />}
        <Routes>
          {!isLogin && <Route path="/" element={<Home />} />}
          {isLogin && <Route path="/inventory" element={<Inventory />} />}
          {isLogin && <Route path="/grocery" element={<Grocery />} />}
          {isLogin && <Route path="/recipe" element={<Recipe />} />}
          {isLogin && <Route path="/profile" element={<Profile />} />}
          {isLogin && (
            <Route path="*" element={<Navigate to="/inventory" replace />} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
