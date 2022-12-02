/* eslint-disable react/prop-types */
import { useState } from "react";
import AddItemForm from "../inventory/addItemForm/AddItemForm";
import classes from "./AddItemBtn.module.css";

function AddItemBtn({ type }) {
  const [openForm, setOpenForm] = useState(false);

  const modalHandler = () => {
    setOpenForm(true);
  };
  if (type === "inventory") {
    return (
      <div className={classes["modal-container"]}>
        {openForm && <AddItemForm setOpenForm={setOpenForm} />}
        {!openForm && (
          <button
            type="button"
            className={classes["add-btn"]}
            onClick={modalHandler}
            data-testid="add-btn"
          >
            Add Item
          </button>
        )}
      </div>
    );
  }
}

export default AddItemBtn;
