import { IoAdd } from "react-icons/io5";
import classes from "./AddItemBtn.module.css";

function AddItemBtn({ type, callbackFn }) {
  const btnHandler = () => {
    if (type === "inventory") {
      callbackFn(true);
    }
    if (type === "grocery") {
      callbackFn(true);
    }
  };

  return (
    <button
      type="button"
      className={classes["add-btn"]}
      onClick={btnHandler}
      data-testid="add-btn"
    >
      <IoAdd color="#ffffff" size={15} />
      Add item
    </button>
  );
}

export default AddItemBtn;
