import { useEffect, useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoAdd, IoRemove } from "react-icons/io5";
import classes from "./InputForm.module.css";
import { useAppSelector } from "../../../hooks/react-redux-hooks";

function InputForm({ onSubmit, selectedId }) {
  const initialItem = useAppSelector((state) =>
    state.grocery.items.find((item) => item.id === selectedId),
  );
  const [item, setItem] = useState({ name: "", qty: 0 });
  //   const [nameValid, setNameValid] = useState(false);
  //   const [numberValid, setNumberValid] = useState(false);
  const [isValid, setIsValid] = useState({
    initial: true,
    name: false,
    qty: false,
  });

  useEffect(() => {
    if (initialItem) {
      setItem(initialItem);
      setIsValid((prev) => {
        return { ...prev, initial: false, name: true, qty: true };
      });
    }
  }, [initialItem]);

  const nameChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length < 1) {
      //   setNameValid(false);
      setIsValid((prev) => {
        return { ...prev, name: false };
      });
    } else {
      //   setNameValid(true);
      setIsValid((prev) => {
        return { ...prev, name: true };
      });
    }
    setItem((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const qtyValidHandler = (qty) => {
    if (qty < 1) {
      //   setNumberValid(false);
      setIsValid((prev) => {
        return { ...prev, qty: false };
      });
    } else {
      //   setNumberValid(true);
      setIsValid((prev) => {
        return { ...prev, qty: true };
      });
    }
  };

  const qtyChangeHandler = (e) => {
    e.preventDefault();
    const value = +e.target.value.replace(/\D/g, "");
    qtyValidHandler(value);
    setItem((prev) => {
      return { ...prev, qty: value };
    });
  };

  const qtyBtnClickHandler = (e) => {
    e.preventDefault();
    if (e.target.id === "increase") {
      setItem((prev) => {
        qtyValidHandler(prev.qty + 1);
        return { ...prev, qty: prev.qty + 1 };
      });
      //   setNumberValid(true);
    }
    if (e.target.id === "decrease") {
      if (item.qty > 0) {
        setItem((prev) => {
          qtyValidHandler(prev.qty - 1);
          return { ...prev, qty: prev.qty - 1 };
        });
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
        setIsValid((prev) => {
          return { ...prev, initial: false };
        });
      }}
      className={classes["add-form"]}
    >
      <div>
        <label htmlFor="name" className={classes["name-form"]}>
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Add name"
            value={item.name}
            onChange={nameChangeHandler}
          />
          <p
            className={`${
              isValid.name || isValid.initial
                ? classes["err-msg"]
                : classes["err-msg-active"]
            }`}
          >
            Please enter a name
          </p>
        </label>
      </div>
      <div className={classes["add-qty"]}>
        <label htmlFor="qty" className={classes["qty-form"]}>
          Quantity
          <input
            type="text"
            id="qty"
            name="qty"
            onChange={qtyChangeHandler}
            placeholder="Add quantity"
            value={item.qty}
          />
          <p
            className={`${
              isValid.qty || isValid.initial
                ? classes["err-msg"]
                : classes["err-msg-active"]
            }`}
          >
            Please enter a quantity
          </p>
        </label>
        <div className={classes["btn-wrapper"]}>
          <button type="button" id="increase" onClick={qtyBtnClickHandler}>
            <IoAdd size={15} color="#ffffff" className={classes["qty-btn"]} />
          </button>
          <button type="button" id="decrease" onClick={qtyBtnClickHandler}>
            <IoRemove
              size={15}
              color="#ffffff"
              className={classes["qty-btn"]}
            />
          </button>
        </div>
      </div>
      {selectedId ? (
        <button
          className={`${classes["submit-btn"]} ${classes["edit-submit"]}`}
          type="submit"
        >
          <MdOutlineSaveAlt color="#ffffff" size={15} />
          Save changes
        </button>
      ) : (
        <button className={classes["submit-btn"]} type="submit">
          <IoAdd color="#ffffff" size={15} className={classes.btn} />
          Add item
        </button>
      )}
    </form>
  );
}

export default InputForm;
