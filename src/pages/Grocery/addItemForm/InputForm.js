/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import classes from "./InputForm.module.css";
import { useAppSelector } from "../../../hooks/react-redux-hooks";
import SetNumber from "../../../components/setNumber/SetNumber";

function InputForm({ onSubmit, selectedId }) {
  const initialItem = useAppSelector((state) =>
    state.grocery.items.find((item) => item.id === selectedId),
  );
  const [item, setItem] = useState({ name: "", qty: "" });

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
        <div htmlFor="qty" className={classes["qty-form"]}>
          <SetNumber
            number={item}
            setNumber={setItem}
            setIsValid={setIsValid}
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
