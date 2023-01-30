import { useEffect, useState } from "react";
import { IoSnow } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillInboxesFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { inventoryCategoryObj } from "../../../utils/categoryObj";
import { useAppDispatch } from "../../../hooks/react-redux-hooks";
import { inventoryActions } from "../../../store/inventorySlice";
import { firebaseDataUpdate } from "../../../utils/firebaseDataUpdate";
import classes from "./MoveItem.module.css";

function MoveItem({ setOpenForm, selectedId, userData }) {
  const [categoryOption, setCategoryOption] = useState(["1", "2", "3"]);

  useEffect(() => {
    const categoryArray = ["1", "2", "3"];
    const data = userData.items.filter((item) => item.id === selectedId);
    setCategoryOption(
      categoryArray.filter((item) => item !== data[0].category),
    );
  }, [selectedId, userData.items]);
  const dispatch = useAppDispatch();
  const closeHandler = () => {
    setOpenForm(false);
  };

  const categoryHandler = (categoryNum) => {
    const previousData = [...userData.items];
    const selectedItem = previousData.find((item) => item.id === selectedId);
    const newItem = {
      id: selectedItem.id,
      category: categoryNum,
      name: selectedItem.name,
      qty: selectedItem.qty,
      expireDate: selectedItem.expireDate,
    };
    firebaseDataUpdate("inventory", userData, newItem);
    dispatch(
      inventoryActions.changeCategory({ selectedId, category: categoryNum }),
    );
    setOpenForm(false);
  };
  return (
    <div className={classes.container}>
      <div className={classes["header-container"]}>
        <h3 className={classes.header}>Move item to</h3>
        <button
          type="button"
          className={classes["exit-btn"]}
          onClick={closeHandler}
        >
          <MdOutlineClose
            className={classes["exit-btn-icon"]}
            size={17}
            color="#000000"
          />
        </button>
      </div>
      <div className={classes["btn-container"]}>
        <button
          type="button"
          onClick={() => categoryHandler(categoryOption[0])}
          className={classes.btn}
        >
          {categoryOption[0] === "1" && (
            <RiFridgeFill size={14} color="#ffffff" />
          )}
          {categoryOption[0] === "2" && <IoSnow size={14} color="#ffffff" />}
          {categoryOption[0] === "3" && (
            <BsFillInboxesFill size={14} color="#ffffff" />
          )}
          {inventoryCategoryObj[categoryOption[0]]}
        </button>
        <button
          type="button"
          onClick={() => categoryHandler(categoryOption[1])}
          className={classes.btn}
        >
          {categoryOption[1] === "1" && (
            <RiFridgeFill size={14} color="#ffffff" />
          )}
          {categoryOption[1] === "2" && <IoSnow size={14} color="#ffffff" />}
          {categoryOption[1] === "3" && (
            <BsFillInboxesFill size={14} color="#ffffff" />
          )}
          {inventoryCategoryObj[categoryOption[1]]}
        </button>
      </div>
    </div>
  );
}

export default MoveItem;
