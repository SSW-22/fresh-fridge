import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/react-redux-hooks";

import Navbar from "./components/Navbar/Navbar";
import Inventory from "./pages/Inventory/Inventory";
import Grocery from "./pages/Grocery/index/Grocery";
import Recipe from "./pages/Recipe/index/Recipe";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import "./App.css";
import checkUserItems from "./firebase/checkItems";
import { inventoryActions } from "./store/inventorySlice";
import { groceryActions } from "./store/grocerySlice";
import { recipeActions } from "./store/recipeSlice";

function App() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.isLogIn);
  // const userId = useAppSelector((state) => state.inventory.userId);
  const userId = useAppSelector((state) => state.user.uid);

  useEffect(() => {
    if (isLogin) {
      const grabData = async () => {
        await checkUserItems("inventory", userId).then((res) => {
          const data = {
            userId: res.userId || userId,
            items: res.items || [],
            reminderDays: res.reminderDays || "",
          };
          dispatch(inventoryActions.update(data));
        });

        await checkUserItems("grocery", userId).then((res) => {
          const data = {
            userId: res.userId || userId,
            items: res.items || [],
          };
          dispatch(groceryActions.update(data));
        });

        await checkUserItems("recipe", userId).then((res) => {
          const data = {
            userId: res.userId || userId,
            items: res.items || [],
          };
          dispatch(recipeActions.update(data));
        });
      };
      grabData();
    }
  }, [isLogin, dispatch, userId]);

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
