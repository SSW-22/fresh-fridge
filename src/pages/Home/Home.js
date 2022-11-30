import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RiLeafFill } from "react-icons/ri";
import { auth } from "../../firebase/Firebase";
import { userActions } from "../../store/userSlice";
import SignIn from "./SignIn";
import classes from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { accessToken, uid } = currentUser;
        dispatch(userActions.logIn({ accessToken, uid }));
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading</div>;
  }

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
