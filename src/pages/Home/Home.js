import { RiLeafFill } from "react-icons/ri";
import SignIn from "./SignIn";
import classes from "./Home.module.css";

function Home() {
  return (
    <div data-testid="Home-component" className={classes.home}>
      <div className={classes.title}>
        <RiLeafFill size={30} color="#007838" />
        <h1>Fresh Fridge</h1>
      </div>
      <SignIn />
      <p className={classes.footer}>© freshfridge.ca</p>
    </div>
  );
}

export default Home;
