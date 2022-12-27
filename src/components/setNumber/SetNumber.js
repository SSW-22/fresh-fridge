import { IoAdd, IoRemove } from "react-icons/io5";
import classes from "./SetNumber.module.css";

function SetNumber({ number, setNumber, setIsValid, type }) {
  const placeholder =
    type === "profile" ? "Add number of days" : "Add quantity";
  const qtyValidHandler = (qty) => {
    const currentNumber = +qty || 0;
    if (currentNumber < 1) {
      setIsValid((prev) => {
        return { ...prev, qty: false };
      });
    } else {
      setIsValid((prev) => {
        return { ...prev, qty: true };
      });
    }
  };

  const qtyChangeHandler = (e) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/g, "");

    qtyValidHandler(value);
    setNumber((prev) => {
      return { ...prev, qty: value };
    });
  };

  const qtyBtnClickHandler = (e) => {
    e.preventDefault();
    let currentNumber = +number.qty || 0;
    if (e.target.id === "increase") {
      currentNumber += 1;
    }
    if (e.target.id === "decrease") {
      if (number.qty > 0) {
        currentNumber -= 1;
      }
    }
    if (currentNumber < 1) {
      currentNumber = "";
    }
    qtyValidHandler(currentNumber);
    setNumber((prev) => {
      return { ...prev, qty: currentNumber.toString() };
    });
  };
  return (
    <div className={classes.container}>
      <label htmlFor="qty" className={classes.qty}>
        <input
          name="qty"
          id="qty"
          type="text"
          placeholder={placeholder}
          value={number.qty}
          onChange={qtyChangeHandler}
          data-testid="number-input-test"
          className={
            placeholder.length < 15
              ? `${classes["qty-small-input"]}`
              : `${classes["qty-large-input"]}`
          }
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
