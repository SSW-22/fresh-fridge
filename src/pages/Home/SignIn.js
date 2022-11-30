import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import signInWithGoogle from "../../firebase/googleAuth";
import { userActions } from "../../store/userSlice";
import classes from "./SignIn.module.css";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = async () => {
    await signInWithGoogle()
      .then((result) => {
        const { user } = result;
        dispatch(userActions.logIn(user.accessToken, user.uid));
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("id", user.uid);
        navigate("inventory");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button type="button" onClick={clickHandler} className={classes.btn}>
        Sign in with your Google account
      </button>
    </div>
  );
}

export default SignIn;
