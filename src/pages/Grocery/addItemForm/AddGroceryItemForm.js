import { v4 as uuidv4 } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { groceryActions } from "../../../store/grocerySlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/react-redux-hooks";
import classes from "./AddGroceryItemForm.module.css";
import InputForm from "./InputForm";
import firebaseDataUpdate from "../../../utils/firebaseDataUpdate";

function AddGroceryItemForm({ setOpenForm, selectedId }) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.grocery);

  const closeFormHandeler = () => {
    setOpenForm(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const qty = +data.get("qty");

    if (name === "" || qty < 1) {
      return;
    }

    let newItem = {
      id: selectedId || uuidv4(),
      name,
      qty,
    };

    dispatch(groceryActions.addItem(newItem));
    firebaseDataUpdate("grocery", userData, newItem);
    newItem = {};
    setOpenForm(false);
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
        <InputForm onSubmit={submitHandler} selectedId={selectedId} />
      </div>
    </div>
  );
}

export default AddGroceryItemForm;
