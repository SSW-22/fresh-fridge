/* eslint-disable prettier/prettier */
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { FiMove } from "react-icons/fi";
import { IoAdd, IoSnow } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillInboxesFill } from "react-icons/bs";
import SetNumber from "../../../components/setNumber/SetNumber";
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
  isEditOpen,
}) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.inventory);
  const groceryUserData = useAppSelector((state) => state.grocery);
  const nameRef = useRef();
  // const expireDateRef = useRef();
  const [date, setDate] = useState("");
  const [itemQty, setItemQty] = useState({ qty: "" });
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
      // expireDateRef.current.value = initialInventoryItem.expireDate;
      setDate(initialInventoryItem.expireDate);
      setSelectedOption(initialInventoryItem.category);
      setItemQty({ qty: initialInventoryItem.qty });
    }
  }, [initialInventoryItem]);

  useEffect(() => {
    if (initialGroceryItem) {
      nameRef.current.value = initialGroceryItem.name;
      setItemQty({ qty: initialGroceryItem.qty });
    }
  }, [initialGroceryItem]);

  const [validation, setValidation] = useState({
    itemName: true,
    qty: true,
    addTo: true,
  });

  // closing form.
  const closeFormHandeler = () => {
    setOpenForm(false);
  };
  // checking all validation for submit form
  const checkValidation = () => {
    const currentItemQty = +itemQty.qty || 0;
    if (nameRef.current.value === "") {
      setValidation((prev) => {
        return { ...prev, itemName: false };
      });
    }
    if (currentItemQty <= 0) {
      setValidation((prev) => {
        return { ...prev, qty: false };
      });
    }
    if (selectedOption === null) {
      setValidation((prev) => {
        return { ...prev, addTo: false };
      });
    }
  };
  // submit for updating redux store and firebase store
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      nameRef.current.value === "" ||
      itemQty.qty <= 0 ||
      selectedOption === null
    ) {
      checkValidation();
      return;
    }
    const newItem = {
      id: selectedId || uuidv4(),
      name: nameRef.current.value,
      // expireDate: expireDateRef.current.value,
      expireDate: date,
      category: selectedOption,
      qty: itemQty.qty,
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
    if (!validation.addTo) {
      setValidation((prev) => {
        return { ...prev, addTo: true };
      });
    }
    setSelectedOption(e.target.value);
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
            <MdOutlineClose size={17} color="#000000" />
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
                      return { ...prev, itemName: true };
                    });
                  }
                }}
              />
              <p
                className={`${
                  validation.itemName
                    ? classes["err-msg"]
                    : classes["err-msg-active"]
                }`}
              >
                Please enter a name
              </p>
            </label>
          </div>
          <div className={classes["input-container"]}>
            <SetNumber
              number={itemQty}
              setNumber={setItemQty}
              setIsValid={setValidation}
              validation={validation}
            />
            <p
              className={`${
                validation.qty ? classes["err-msg"] : classes["err-msg-active"]
              }`}
            >
              Please enter a quantity
            </p>
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
                    ? classes["err-msg"]
                    : classes["err-msg-active"]
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
                // ref={expireDateRef}
                value={date}
                onChange={(e) => {
                  e.preventDefault();
                  setDate(e.target.value);
                }}
                placeholder="yyyy - mm - dd"
                // className={classes["date-input"]}
                className={`${classes["date-input"]} ${
                  date ? classes["date-input-filled"] : ""
                }`}
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
              {isEditOpen ? "Edit" : "Add item"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;
