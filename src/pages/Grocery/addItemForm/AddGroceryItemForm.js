import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { IoAdd, IoRemove } from "react-icons/io5";
import { groceryActions } from "../../../store/grocerySlice";
import { useAppDispatch } from "../../../hooks/react-redux-hooks";
import classes from "./AddGroceryItemForm.module.css";

function AddGroceryItemForm({ setOpenForm }) {
  const dispatch = useAppDispatch();
  const nameRef = useRef();
  const [qty, setQty] = useState(0);
  const [nameValid, setNameValid] = useState(true);
  const [numberValid, setNumberValid] = useState(true);

  const closeFormHandeler = () => {
    setOpenForm(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameRef.current.value === "" || qty < 1) {
      if (nameRef.current.value === "") {
        setNameValid(false);
      }
      if (qty < 1) {
        setNumberValid(false);
      }
      return;
    }
    let newItem = {
      id: uuidv4(),
      name: nameRef.current.value,
      qty,
    };
    dispatch(groceryActions.addItem(newItem));
    nameRef.current.value = "";
    setQty(0);
    newItem = {};
    setOpenForm(false);
  };
  const qtyChangeHandler = (e) => {
    e.preventDefault();
    const value = +e.target.value.replace(/\D/g, "");
    if (value < 1) {
      setNumberValid(false);
    } else {
      setNumberValid(true);
    }
    setQty(value);
  };

  const qtyBtnClickHandler = (e) => {
    e.preventDefault();
    if (
      e.target.parentNode.id === "increase" ||
      e.target.parentNode.parentNode.id === "increase"
    ) {
      setQty((prev) => prev + 1);
      setNumberValid(true);
    }
    if (
      e.target.parentNode.id === "decrease" ||
      e.target.parentNode.parentNode.id === "decrease"
    ) {
      if (qty > 0) {
        setQty((prev) => prev - 1);
      }
    }
  };
  return (
    <div data-testid="add-grocery-form" className={classes["grocery-add-form"]}>
      <div className={classes["title-box"]}>
        <h1>Add item</h1>
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
              ref={nameRef}
              placeholder="Add name"
              onChange={() => {
                if (nameRef.current.value.length > 0) {
                  setNameValid(true);
                }
              }}
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
              value={qty}
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
        <button
          className={classes["submit-btn"]}
          type="submit"
          disabled={!nameValid || !numberValid}
        >
          <IoAdd color="#ffffff" size={15} />
          Add item
        </button>
      </form>
    </div>
  );
}

export default AddGroceryItemForm;
