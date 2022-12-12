import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FiMove } from "react-icons/fi";
import AddGroceryItemForm from "../../pages/Grocery/addItemForm/AddGroceryItemForm";
import classes from "./EditMoveDelete.module.css";

function EditMoveDelete({ selectedId }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <div className={classes.edm}>
      {isEditOpen && (
        <AddGroceryItemForm
          setOpenForm={setIsEditOpen}
          selectedId={selectedId}
        />
      )}
      <div className={classes["edm-btn"]}>
        <button
          className={`${classes.btn} ${isEditOpen ? classes.active : ""}`}
          type="button"
          onClick={() => {
            setIsEditOpen(!isEditOpen);
            setIsMoveOpen(false);
            setIsDeleteOpen(false);
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
            setIsDeleteOpen(false);
          }}
        >
          <FiMove size={14} />
          <p>Move to</p>
        </button>
        <button
          className={`${classes.btn} ${isDeleteOpen ? classes.active : ""}`}
          type="button"
          onClick={() => {
            setIsEditOpen(false);
            setIsMoveOpen(false);
            setIsDeleteOpen(true);
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
