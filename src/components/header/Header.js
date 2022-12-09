import classes from "./Header.module.css";

function Header({ children }) {
  return (
    <div className={classes.header} data-testid="header-title">
      {children}
    </div>
  );
}

export default Header;
