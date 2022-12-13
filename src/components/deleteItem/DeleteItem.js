import { MdOutlineClose } from "react-icons/md";
import { useAppDispatch } from "../../hooks/react-redux-hooks";
import { groceryActions } from "../../store/grocerySlice";
import classes from "./DeleteItem.module.css";

function DeleteItem({ setOpenForm, selectedId, setSelctedId }) {
  const dispatch = useAppDispatch();
  const deleteBtnHandler = (e) => {
    e.preventDefault();
    dispatch(groceryActions.deleteItem(selectedId));
    setSelctedId("");
    setOpenForm(false);
  };

  return (
    <div data-testid="delete-test" className={classes.delete}>
      <div className={classes["title-box"]}>
        <h1>Delete item</h1>
        <button
          type="button"
          data-testid="close-btn"
          onClick={() => {
            setOpenForm(false);
          }}
        >
          <MdOutlineClose size={17} />
        </button>
      </div>
      <div className={classes["btn-box"]}>
        <button
          type="button"
          data-testid="confirm-btn"
          onClick={deleteBtnHandler}
          className={classes["delete-btn"]}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteItem;
