import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FiMove } from "react-icons/fi";
import AddGroceryItemForm from "../../pages/Grocery/addItemForm/AddGroceryItemForm";
import { useAppDispatch, useAppSelector } from "../../hooks/react-redux-hooks";
import { inventoryActions } from "../../store/inventorySlice";
import classes from "./EditMoveDelete.module.css";
import { groceryActions } from "../../store/grocerySlice";
import AddItemForm from "../../pages/Inventory/addItemForm/AddItemForm";
import { firebaseDataUpdate } from "../../utils/firebaseDataUpdate";
import MoveItem from "../../pages/Inventory/moveItem/MoveItem";

function EditMoveDelete({ type, selectedId, setSelctedId }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => {
    if (type === "inventory") {
      return state.inventory;
    }
    return state.grocery;
  });

  const deleteBtnHandler = async (e) => {
    e.preventDefault();
    const actionHandler =
      type === "inventory"
        ? inventoryActions.deleteItem(selectedId)
        : groceryActions.deleteItem(selectedId);

    dispatch(actionHandler);
    const newItem = {
      id: selectedId,
    };

    firebaseDataUpdate(type, userData, newItem);
    setSelctedId("");
  };

  return (
    <div className={classes.edm}>
      {type === "grocery" && isEditOpen && (
        <AddGroceryItemForm
          setOpenForm={setIsEditOpen}
          selectedId={selectedId}
        />
      )}

      {type === "inventory" && isEditOpen && (
        <div className={classes["add-form-container"]}>
          <AddItemForm
            setOpenForm={setIsEditOpen}
            type={type}
            selectedId={selectedId}
            setSelctedId={setSelctedId}
          />
        </div>
      )}
      {type === "grocery" && isMoveOpen && (
        <div className={classes["add-form-container"]}>
          <AddItemForm
            setOpenForm={setIsMoveOpen}
            type={type}
            selectedId={selectedId}
            setSelctedId={setSelctedId}
          />
        </div>
      )}
      {type === "inventory" && isMoveOpen && (
        <MoveItem
          setOpenForm={setIsMoveOpen}
          selectedId={selectedId}
          userData={userData}
        />
      )}
      <div className={classes["edm-btn"]}>
        <button
          className={`${classes.btn} ${isEditOpen ? classes.active : ""}`}
          type="button"
          onClick={() => {
            setIsEditOpen(!isEditOpen);
            setIsMoveOpen(false);
          }}
        >
          <AiFillEdit size={14} />
          <p>Edit</p>
        </button>
        <button
          className={`${classes.btn} ${isMoveOpen ? classes.active : ""}`}
          type="button"
          onClick={() => {
            setIsEditOpen(false);
            setIsMoveOpen(true);
          }}
        >
          <FiMove size={14} />
          <p>Move to</p>
        </button>
        <button
          className={classes.btn}
          type="button"
          onClick={(e) => {
            deleteBtnHandler(e);
          }}
        >
          <AiFillDelete size={14} />
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
}

export default EditMoveDelete;
