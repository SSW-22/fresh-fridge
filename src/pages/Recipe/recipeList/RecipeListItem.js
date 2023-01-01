import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ExtendItem from "./ExtendItem";
import classes from "./RecipeListItem.module.css";

function RecipeListItem({ category, item }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [category]);
  const extBtnClickHandler = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <li
      data-testid="list-item-test"
      className={`${classes["item-list"]} ${
        isOpen && classes["item-list-open"]
      } `}
    >
      {/* <div className={classes["list-textbox"]}> */}
      <div
        className={`${classes["list-textbox"]} ${
          isOpen && classes["text-box-open"]
        } `}
      >
        <p>{item.name}</p>
        <button
          type="button"
          onClick={extBtnClickHandler}
          className={classes["ext-btn"]}
        >
          <FaChevronDown
            className={isOpen && `${classes["display-none"]}`}
            size={14}
            color="#bfbfbf"
          />

          <FaChevronUp
            className={!isOpen && `${classes["display-none"]}`}
            size={14}
            color="#007838"
          />
        </button>
      </div>
      {isOpen && <ExtendItem item={item} category={category} />}
    </li>
  );
}

export default RecipeListItem;
