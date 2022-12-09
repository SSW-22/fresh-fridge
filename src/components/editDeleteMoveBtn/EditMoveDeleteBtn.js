import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FiMove } from "react-icons/fi";
import classes from "./EditMoveDeleteBtn.module.css";

function EditMoveDeleteBtn() {
  return (
    <div className={classes["edm-btn"]}>
      <button
        className={classes.btn}
        type="button"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <AiFillEdit size={14} />
        <p>Edit</p>
      </button>
      <button
        className={classes.btn}
        type="button"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <FiMove size={14} />
        <p>Move to</p>
      </button>
      <button
        className={classes.btn}
        type="button"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <AiFillDelete size={14} />
        <p>Delete</p>
      </button>
    </div>
  );
}

export default EditMoveDeleteBtn;
