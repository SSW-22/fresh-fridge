import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { signOutWithGoogle } from "../../firebase/googleAuth";
import classes from "./Logout.module.css";
import { inventoryActions } from "../../store/inventorySlice";
import { groceryActions } from "../../store/grocerySlice";

function Logout() {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    try {
      signOutWithGoogle();
      dispatch(userActions.logOut());
      dispatch(inventoryActions.deleteUser());
      dispatch(groceryActions.deleteUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={logOutHandler}
      className={classes.btn}
      data-testid="logout-test"
    >
      <FiLogOut color="#ffffff" size={12} />
      Logout
    </button>
  );
}

export default Logout;
