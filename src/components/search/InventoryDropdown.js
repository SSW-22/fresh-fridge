import { IoHomeSharp, IoSnow } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillInboxesFill } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { inventoryCategoryObj } from "../../utils/categoryObj";
import classes from "./InventoryDropdown.module.css";

function InventoryDropdown({
  category,
  isOpen,
  dropdownBtnClickHandler,
  categoryClickHandler,
}) {
  return (
    <div data-testid="inventory-dropdown" className={classes.dropdown}>
      <div className={classes.header}>
        {category === "0" && <IoHomeSharp size={20} color="#ffffff" />}
        {category === "1" && <RiFridgeFill size={20} color="#ffffff" />}
        {category === "2" && <IoSnow size={20} color="#ffffff" />}
        {category === "3" && <BsFillInboxesFill size={20} color="#ffffff" />}
        <p>{inventoryCategoryObj[category]}</p>
      </div>
      <div>
        <button
          type="button"
          data-testid="dropdown-btn"
          onClick={dropdownBtnClickHandler}
          className={classes["dropdown-btn"]}
        >
          <FaChevronDown
            className={isOpen && `${classes["display-none"]}`}
            size={11}
            color="#ffffff"
          />
          <FaChevronUp
            className={!isOpen && `${classes["display-none"]}`}
            size={11}
            color="#ffffff"
          />
        </button>
        <div>
          {isOpen && (
            <ul data-testid="dropdown-component">
              {category !== "0" && (
                <li>
                  <button
                    type="button"
                    onClick={categoryClickHandler}
                    data-type="0"
                    className={classes["category-btn"]}
                    id={classes["all-food"]}
                  >
                    <IoHomeSharp size={20} />
                    All Food
                  </button>
                </li>
              )}
              {category !== "1" && (
                <li>
                  <button
                    type="button"
                    onClick={categoryClickHandler}
                    data-type="1"
                    className={classes["category-btn"]}
                  >
                    <RiFridgeFill size={20} />
                    Fridge
                  </button>
                </li>
              )}
              {category !== "2" && (
                <li>
                  <button
                    type="button"
                    onClick={categoryClickHandler}
                    data-type="2"
                    className={classes["category-btn"]}
                  >
                    <IoSnow size={20} />
                    Freezer
                  </button>
                </li>
              )}
              {category !== "3" && (
                <li>
                  <button
                    type="button"
                    onClick={categoryClickHandler}
                    data-type="3"
                    className={classes["category-btn"]}
                  >
                    <BsFillInboxesFill size={18} />
                    Pantry
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryDropdown;
