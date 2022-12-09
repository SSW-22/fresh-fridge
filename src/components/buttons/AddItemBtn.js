/* eslint-disable react/prop-types */
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
      Add Item
    </button>
  );
}

export default AddItemBtn;
