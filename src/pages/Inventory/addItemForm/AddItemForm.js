import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { inventoryActions } from "../../../store/inventorySlice";
import { useAppDispatch } from "../../../hooks/react-redux-hooks";
import classes from "./AddItemForm.module.css";

function AddItemForm({ setOpenForm }) {
  const dispatch = useAppDispatch();
  const nameRef = useRef();
  const expireDateRef = useRef();
  const [itemQty, setItemQty] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const [validation, setValidation] = useState({
    itemName: null,
    qty: null,
    addTo: null,
  });
  // closing form
  const closeFormHandeler = () => {
    setOpenForm(false);
  };
  // checking all validation for submit form
  const checkValidation = () => {
    if (nameRef.current.value === "") {
      setValidation((prev) => {
        return { ...prev, itemName: true };
      });
    }
    if (itemQty <= 0) {
      setValidation((prev) => {
        return { ...prev, qty: true };
      });
    }
    if (selectedOption === null) {
      setValidation((prev) => {
        return { ...prev, addTo: true };
      });
    }
  };
  // submit for updating redux store and firebase store
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      nameRef.current.value === "" ||
      itemQty <= 0 ||
      selectedOption === null
    ) {
      checkValidation();
      return;
    }
    const newItem = {
      id: uuidv4(),
      name: nameRef.current.value,
      expireDate: expireDateRef.current.value,
      category: selectedOption,
      qty: itemQty,
    };
    dispatch(inventoryActions.addItem(newItem));
    setOpenForm(false);
  };

  // addTo handler
  const radioHandler = (e) => {
    if (validation.addTo) {
      setValidation((prev) => {
        return { ...prev, addTo: false };
      });
    }
    setSelectedOption(e.target.value);
  };
  // qty handler by directly input
  const qtyHandler = (e) => {
    if (validation.qty) {
      setValidation((prev) => {
        return { ...prev, qty: false };
      });
    }
    const converToNum = Number(e.target.value.replace(/\D/g, ""));
    setItemQty(converToNum);
  };
  // qty handler by increase or decrease btns
  const qtyBtnHandler = (type) => {
    if (validation.qty) {
      setValidation((prev) => {
        return { ...prev, qty: false };
      });
    }
    if (type === "increase") {
      setItemQty((prev) => prev + 1);
    }
    if (type === "decrease") {
      if (itemQty === 0) return;
      setItemQty((prev) => prev - 1);
    }
  };
  return (
    <div className={classes["modal-container"]}>
      <h1>Add Item</h1>
      <form
        action=""
        data-testid="adding-item-form"
        onSubmit={submitHandler}
        className={classes["form-container"]}
      >
        <div>
          <label htmlFor="name" className={classes["input-container"]}>
            Name
            <input
              type="text"
              id="name"
              className={classes["input-name"]}
              placeholder="Add name"
              ref={nameRef}
              onChange={() => {
                if (nameRef.current.value.length > 0) {
                  setValidation((prev) => {
                    return { ...prev, itemName: false };
                  });
                }
              }}
            />
            {validation.itemName && (
              <p className={classes["validation-warn"]}>Plese enter a name</p>
            )}
          </label>
          <label htmlFor="quantity" className={classes["input-container"]}>
            Quantity
            <div className={classes["input-divider"]}>
              <input
                type="text"
                id="quantity"
                value={itemQty}
                onChange={qtyHandler}
                className={classes["input-qty"]}
                placeholder="Add quantity"
              />
              <div className={classes["btn-container"]}>
                <button type="button" onClick={() => qtyBtnHandler("increase")}>
                  +
                </button>
                <button type="button" onClick={() => qtyBtnHandler("decrease")}>
                  -
                </button>
              </div>
            </div>
            {validation.qty && (
              <p className={classes["validation-warn"]}>
                Please enter a quantity
              </p>
            )}
          </label>
          <label htmlFor="addTo" className={classes["input-container"]}>
            Add to
            <div className={classes["radio-btn-container"]}>
              <label
                htmlFor="addToFridge"
                className={`
                ${selectedOption === "1" ? classes["radio-selected"] : ""}`}
              >
                Fridge
                <input
                  type="radio"
                  id="addToFridge"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={radioHandler}
                />
              </label>
              <label
                htmlFor="addToFreezer"
                className={`
                ${selectedOption === "2" ? classes["radio-selected"] : ""}`}
              >
                Freezer
                <input
                  type="radio"
                  id="addToFreezer"
                  value="2"
                  onChange={radioHandler}
                  checked={selectedOption === "2"}
                />
              </label>
              <label
                htmlFor="addToPantry"
                className={`
                ${selectedOption === "3" ? classes["radio-selected"] : ""}`}
              >
                Plantry
                <input
                  type="radio"
                  id="addToPantry"
                  value="3"
                  onChange={radioHandler}
                  checked={selectedOption === "3"}
                />
              </label>
            </div>
            {validation.addTo && (
              <p className={classes["validation-warn"]}>
                Please select a location
              </p>
            )}
          </label>
          <label
            htmlFor="expirationDate"
            className={classes["input-container"]}
          >
            Expiration Date
            <input type="date" id="expirationDate" ref={expireDateRef} />
          </label>
        </div>
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
        x
      </button>
    </div>
  );
}

export default AddItemForm;
