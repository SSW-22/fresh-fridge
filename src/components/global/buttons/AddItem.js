import { useState } from "react";
import classes from "./AddItem.module.css";

function AddItem() {
  const [addingForm, setAddingForm] = useState(false);
  const closeFormhandeler = () => {
    setAddingForm(false);
  };
  const addingHandler = () => {
    if (!addingForm) {
      setAddingForm(true);
      return;
    }
    const dummyData = "hello";
    console.log(dummyData);
  };
  return (
    <div>
      {addingForm && (
        <>
          <form
            action=""
            data-testid="adding-item-form"
            onSubmit={addingHandler}
          >
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </form>
          <button type="button" onClick={closeFormhandeler}>
            X
          </button>
          <button
            type="button"
            onClick={addingHandler}
            className={classes["add-btn"]}
          >
            Add Item
          </button>
        </>
      )}
      {!addingForm && (
        <button
          type="button"
          onClick={addingHandler}
          className={classes["add-btn"]}
        >
          Add Item
        </button>
      )}
    </div>
  );
}

export default AddItem;
