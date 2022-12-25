import { IoAdd, IoRemove } from "react-icons/io5";
import classes from "./SetNumber.module.css";

function SetNumber({ number, setNumber, setIsValid }) {
  const qtyChangeHandler = (e) => {
    e.preventDefault();
    let value = e.target.value.replace(/\D/g, "");
    if (!value || value === "0") {
      value = "";
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setNumber(value);
  };

  const qtyBtnClickHandler = (e) => {
    e.preventDefault();
    let currentNumber = +number || 0;
    if (e.target.id === "increase") {
      currentNumber += 1;
    }
    if (e.target.id === "decrease") {
      if (number > 0) {
        currentNumber -= 1;
      }
    }
    if (currentNumber < 1) {
      setIsValid(false);
      currentNumber = "";
    } else {
      setIsValid(true);
    }
    setNumber(currentNumber.toString());
  };
  return (
    <div className={classes.container}>
      <label htmlFor="qty">
        <div className={classes["hidden-label"]} aria-hidden="true">
          Add number of days
        </div>
        <input
          name="qty"
          id="qty"
          type="text"
          placeholder="Add number of days"
          value={number}
          onChange={qtyChangeHandler}
          data-testid="number-input-test"
        />
      </label>
      <div className={classes["btn-wrapper"]}>
        <button
          type="button"
          id="increase"
          onClick={qtyBtnClickHandler}
          data-testid="increase-btn"
        >
          <IoAdd size={15} color="#ffffff" className={classes["qty-btn"]} />
        </button>
        <button
          type="button"
          id="decrease"
          onClick={qtyBtnClickHandler}
          data-testid="decrease-btn"
        >
          <IoRemove size={15} color="#ffffff" className={classes["qty-btn"]} />
        </button>
      </div>
    </div>
  );
}

export default SetNumber;
