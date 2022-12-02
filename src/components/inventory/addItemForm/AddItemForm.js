/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { inventoryActions } from "../../../store/inventorySlice";
import { useAppDispatch } from "../../../hooks/react-redux-hooks";
import classes from "./AddItemForm.module.css";

function AddItemForm({ setOpenForm }) {
  const dispatch = useAppDispatch();
  const nameRef = useRef();
  const quantityRef = useRef();
  const [selectedOption, setSelectedOption] = useState(null);
  const closeFormHandeler = () => {
    setOpenForm(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(inventoryActions.addItem({ name: nameRef.current.value }));
    // somthing for redux part.
  };

  const radioHandler = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className={classes["modal-container"]}>
      <form
        action=""
        data-testid="adding-item-form"
        onSubmit={submitHandler}
        className={classes["form-container"]}
      >
        <label htmlFor="name" className={classes["input-container"]}>
          Name
          <input type="text" id="name" placeholder="Add name" ref={nameRef} />
        </label>
        <label htmlFor="quantity" className={classes["input-container"]}>
          Quantity
          <input
            type="text"
            id="quantity"
            ref={quantityRef}
            placeholder="Add quantity"
          />
        </label>
        <label htmlFor="addTo" className={classes["input-container"]}>
          Add to
          <input
            type="radio"
            id="addTo"
            value="1"
            checked={selectedOption === "1"}
            onChange={radioHandler}
          />
          <input
            type="radio"
            id="addTo"
            value="2"
            onChange={radioHandler}
            checked={selectedOption === "2"}
          />
          <input
            type="radio"
            id="addTo"
            value="3"
            onChange={radioHandler}
            checked={selectedOption === "3"}
          />
        </label>
        <label htmlFor="expirationDate" className={classes["input-container"]}>
          Expiration Date
          <input type="date" id="expirationDate" />
        </label>
        <button
          type="button"
          onClick={submitHandler}
          className={classes["add-btn"]}
        >
          Add Item
        </button>
      </form>
      <button
        type="button"
        onClick={closeFormHandeler}
        className={classes["close-btn"]}
      >
        X
      </button>
    </div>
  );
}

export default AddItemForm;
