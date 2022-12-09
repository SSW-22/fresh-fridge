import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../firebase/googleAuth";
import { userActions } from "../../store/userSlice";
import { inventoryActions } from "../../store/inventorySlice";
import { groceryActions } from "../../store/grocerySlice";
import classes from "./SignIn.module.css";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = async () => {
    await signInWithGoogle()
      .then((result) => {
        const { user } = result;
        dispatch(userActions.logIn(user.accessToken, user.uid));
        dispatch(inventoryActions.addUser(user.uid));
        dispatch(groceryActions.addUser(user.uid));
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
