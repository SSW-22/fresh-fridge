import { NavLink } from "react-router-dom";
import { GiCook } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";

import classes from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={classes.navbar}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.inactive}`
              }
            >
              <div className={classes.btn}>
                <IoHomeSharp size={30} />
                <p>Inventory</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/grocery"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.inactive}`
              }
            >
              <div className={classes.btn}>
                <FaShoppingCart size={30} />
                <p>Grocery</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipe"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.inactive}`
              }
            >
              <div className={classes.btn}>
                <GiCook size={33} />
                <p>Recipe</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.inactive}`
              }
            >
              <div className={classes.btn}>
                <BsFillPersonFill size={33} />
                <p>Profile</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
