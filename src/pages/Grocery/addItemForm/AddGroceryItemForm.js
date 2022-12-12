import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineClose, MdOutlineSaveAlt } from "react-icons/md";
import { IoAdd, IoRemove } from "react-icons/io5";
import { groceryActions } from "../../../store/grocerySlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/react-redux-hooks";
import classes from "./AddGroceryItemForm.module.css";

function AddGroceryItemForm({ setOpenForm, selectedId }) {
  const dispatch = useAppDispatch();
  const initialItem = useAppSelector((state) =>
    state.grocery.items.find((item) => item.id === selectedId),
  );
  // const initialItem = useAppSelector((state) =>
  //   state.grocery.items.find((item) => item.id === selectedId),
  // ) || { name: "", qty: 0 };
  const [item, setItem] = useState({ name: "", qty: 0 });
  const [nameValid, setNameValid] = useState(true);
  const [numberValid, setNumberValid] = useState(true);

  useEffect(() => {
    if (initialItem) {
      setItem(initialItem);
    }
  }, [initialItem]);

  const closeFormHandeler = () => {
    setOpenForm(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (item.name === "" || item.qty < 1) {
      if (item.name === "") {
        setNameValid(false);
      }
      if (item.qty < 1) {
        setNumberValid(false);
      }
      return;
    }
    let newItem = {
      id: selectedId || uuidv4(),
      name: item.name,
      qty: item.qty,
    };
    dispatch(groceryActions.addItem(newItem));
    setItem({ name: "", qty: 0 });
    newItem = {};
    setOpenForm(false);
  };

  const nameChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length < 1) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setItem((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const qtyChangeHandler = (e) => {
    e.preventDefault();
    const value = +e.target.value.replace(/\D/g, "");
    if (value < 1) {
      setNumberValid(false);
    } else {
      setNumberValid(true);
    }
    setItem((prev) => {
      return { ...prev, qty: value };
    });
  };

  const qtyBtnClickHandler = (e) => {
    e.preventDefault();
    if (
      e.target.parentNode.id === "increase" ||
      e.target.parentNode.parentNode.id === "increase"
    ) {
      setItem((prev) => {
        return { ...prev, qty: prev.qty + 1 };
      });
      setNumberValid(true);
    }
    if (
      e.target.parentNode.id === "decrease" ||
      e.target.parentNode.parentNode.id === "decrease"
    ) {
      if (item.qty > 0) {
        setItem((prev) => {
          return { ...prev, qty: prev.qty - 1 };
        });
      }
    }
  };

  return (
    <div className={`${selectedId ? "" : classes["add-form-bg"]} `}>
      <div
        data-testid="add-grocery-form"
        className={classes["grocery-add-form"]}
      >
        <div className={classes["title-box"]}>
          {selectedId ? <h1>Edit item</h1> : <h1>Add item</h1>}
          <button
            type="button"
            data-testid="close-btn"
            onClick={closeFormHandeler}
          >
            <MdOutlineClose size={17} />
          </button>
        </div>
        <form onSubmit={submitHandler} className={classes["add-form"]}>
          <div>
            <label htmlFor="name" className={classes["name-form"]}>
              Name
              <input
                type="text"
                id="name"
                placeholder="Add name"
                value={item.name}
                onChange={nameChangeHandler}
              />
              <p
                className={`${
                  nameValid ? classes["err-msg"] : classes["err-msg-active"]
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
                onChange={qtyChangeHandler}
                placeholder="Add quantity"
                value={item.qty}
              />
              <p
                className={`${
                  numberValid ? classes["err-msg"] : classes["err-msg-active"]
                }`}
              >
                Please enter a quantity
              </p>
            </label>
            <div className={classes["btn-wrapper"]}>
              <button type="button" id="increase" onClick={qtyBtnClickHandler}>
                <IoAdd size={15} color="#ffffff" />
              </button>
              <button type="button" id="decrease" onClick={qtyBtnClickHandler}>
                <IoRemove size={15} color="#ffffff" />
              </button>
            </div>
          </div>
          {selectedId ? (
            <button
              className={`${classes["submit-btn"]} ${classes["edit-submit"]}`}
              type="submit"
              disabled={!nameValid || !numberValid}
            >
              <MdOutlineSaveAlt color="#ffffff" size={15} />
              Save changes
            </button>
          ) : (
            <button
              className={classes["submit-btn"]}
              type="submit"
              disabled={!nameValid || !numberValid}
            >
              <IoAdd color="#ffffff" size={15} />
              Add item
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddGroceryItemForm;
