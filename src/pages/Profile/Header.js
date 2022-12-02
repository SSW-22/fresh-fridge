import { BsFillPersonFill } from "react-icons/bs";
import classes from "./Header.module.css";

function Header() {
  return (
    <div className={classes.header}>
      <BsFillPersonFill size={23} color="#ffffff" />
      <p>Settings</p>
    </div>
  );
}

export default Header;
