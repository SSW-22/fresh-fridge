import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { signOutWithGoogle } from "../../firebase/googleAuth";
import classes from "./Logout.module.css";

function Logout() {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    try {
      signOutWithGoogle();
      dispatch(userActions.logOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button type="button" onClick={logOutHandler} className={classes.btn}>
      Logout
    </button>
  );
}

export default Logout;
