import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { recipeCategoryObj } from "../../utils/categoryObj";
import classes from "./RecipeDropdown.module.css";

function RecipeDropdown({
  category,
  isOpen,
  dropdownBtnClickHandler,
  categoryClickHandler,
}) {
  return (
    <div data-testid="recipe-dropdown" className={classes.dropdown}>
      <div className={classes.header}>
        {category === "0" && <GiCook size={20} color="#ffffff" />}
        {category === "1" && <GiCook size={20} color="#ffffff" />}
        <p>{recipeCategoryObj[category]}</p>
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
                  >
                    <GiCook size={20} />
                    Search Recipes
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
                    <GiCook size={20} />
                    Saved Recipes
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
export default RecipeDropdown;
