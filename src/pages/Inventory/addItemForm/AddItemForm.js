/* eslint-disable prettier/prettier */
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { FiMove } from "react-icons/fi";
import { IoAdd, IoSnow } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillInboxesFill } from "react-icons/bs";
// import addDocument from "../../../firebase/addItemInventory";
import { inventoryActions } from "../../../store/inventorySlice";
import { groceryActions } from "../../../store/grocerySlice";
// import getNewItemArray from "../../../utils/getNewItemArray";
import { firebaseDataUpdate } from "../../../utils/firebaseDataUpdate";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/react-redux-hooks";
import classes from "./AddItemForm.module.css";

function AddItemForm({
  setOpenForm,
  type,
  selectedId = null,
  setSelctedId = null,
}) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.inventory);
  const groceryUserData = useAppSelector((state) => state.grocery);
  const nameRef = useRef();
  const expireDateRef = useRef();
  const [itemQty, setItemQty] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const initialInventoryItem = useAppSelector((state) =>
    state.inventory.items.find((item) => item.id === selectedId),
  );

  const initialGroceryItem = useAppSelector((state) =>
    state.grocery.items.find((item) => item.id === selectedId),
  );

  useEffect(() => {
    if (initialInventoryItem) {
      nameRef.current.value = initialInventoryItem.name;
      expireDateRef.current.value = initialInventoryItem.expireDate;
      setSelectedOption(initialInventoryItem.category);
      setItemQty(initialInventoryItem.qty);
    }
  }, [initialInventoryItem]);

  useEffect(() => {
    if (initialGroceryItem) {
      nameRef.current.value = initialGroceryItem.name;
      setItemQty(initialGroceryItem.qty);
    }
  }, [initialGroceryItem]);

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
  const submitHandler = async (e) => {
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
      id: selectedId || uuidv4(),
      name: nameRef.current.value,
      expireDate: expireDateRef.current.value,
      category: selectedOption,
      qty: itemQty,
    };
    dispatch(inventoryActions.addItem(newItem));
    // update manually
    firebaseDataUpdate("inventory", userData, newItem);

    if (type === "grocery") {
      dispatch(groceryActions.deleteItem(selectedId));
      const newItem = {
        id: selectedId,
      };
      firebaseDataUpdate("grocery", groceryUserData, newItem);
      setSelctedId("");
    }

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
    <div
      className={`${classes["add-form-bg"]} ${
        selectedId ? classes["form-bg-grocery"] : ""
      }`}
    >
      <div
        className={`${classes["modal-container"]} ${
          selectedId ? classes["modal-container-grocery"] : ""
        }`}
      >
        <div className={classes["title-box"]}>
          {type === "grocery" ? <h1>Move Item</h1> : <h1>Add Item</h1>}
          <button
            type="button"
            onClick={closeFormHandeler}
            className={classes["close-btn"]}
            data-testid="closeBtn"
          >
            <MdOutlineClose size={17} />
          </button>
        </div>
        <form
          action=""
          data-testid="adding-item-form"
          onSubmit={submitHandler}
          className={classes["add-form"]}
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
              <p
                className={`${
                  validation.itemName
                    ? classes["err-msg-active"]
                    : classes["err-msg"]
                }`}
              >
                Please enter a name
              </p>
            </label>
          </div>
          <div>
            <label htmlFor="quantity" className={classes["input-container"]}>
              Quantity
              <div className={classes["input-qty-divider"]}>
                <div className={classes["input-qty-box"]}>
                  <input
                    type="text"
                    id="quantity"
                    value={itemQty}
                    onChange={qtyHandler}
                    className={classes["input-qty"]}
                    placeholder="Add quantity"
                  />
                  <div className={classes["btn-container"]}>
                    <button
                      type="button"
                      onClick={() => qtyBtnHandler("increase")}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => qtyBtnHandler("decrease")}
                    >
                      -
                    </button>
                  </div>
                </div>
                <p
                  className={`${
                    validation.qty
                      ? classes["err-msg-active"]
                      : classes["err-msg"]
                  }`}
                >
                  Please enter a quantity
                </p>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="addTo" className={classes["input-container"]}>
              Add to
              <div className={classes["radio-btn-container"]}>
                <label
                  htmlFor="addToFridge"
                  className={`
                ${selectedOption === "1" ? classes["radio-selected"] : ""}`}
                >
                  <RiFridgeFill
                    size={15}
                    color={`${selectedOption === "1" ? "#000000" : "#ffffff"}`}
                  />
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
                  <IoSnow
                    size={15}
                    color={`${selectedOption === "2" ? "#000000" : "#ffffff"}`}
                  />
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
                  <BsFillInboxesFill
                    size={15}
                    color={`${selectedOption === "3" ? "#000000" : "#ffffff"}`}
                  />
                  Pantry
                  <input
                    type="radio"
                    id="addToPantry"
                    value="3"
                    onChange={radioHandler}
                    checked={selectedOption === "3"}
                  />
                </label>
              </div>
              <p
                className={`${
                  validation.addTo
                    ? classes["err-msg-active"]
                    : classes["err-msg"]
                }`}
              >
                Please select a location
              </p>
            </label>
          </div>
          <div>
            <label
              htmlFor="expirationDate"
              className={classes["input-container"]}
            >
              Expiration Date
              <input
                type="date"
                id="expirationDate"
                ref={expireDateRef}
                className={classes["date-input"]}
              />
            </label>
          </div>

          {type === "grocery" ? (
            <button
              type="button"
              onClick={submitHandler}
              className={`${classes["submit-btn"]} ${classes["move-submit"]}`}
            >
              <FiMove color="#ffffff" size={15} className={classes.btn} />
              Move item
            </button>
          ) : (
            <button
              type="button"
              onClick={submitHandler}
              className={classes["submit-btn"]}
            >
              <IoAdd color="#ffffff" size={15} className={classes.btn} />
              Add item
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;
