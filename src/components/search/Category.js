import { useState, useRef, useEffect } from "react";
import classes from "./Category.module.css";
import InventoryDropdown from "./InventoryDropdown";
import RecipeDropdown from "./RecipeDropdown";

function Category({ category, setCategory, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef, setIsOpen]);

  const dropdownBtnClickHandler = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const categoryClickHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.getAttribute("data-type"));
  };

  return (
    <div className={classes.category} ref={wrapperRef}>
      {type === "inventory" ? (
        <InventoryDropdown
          category={category}
          isOpen={isOpen}
          dropdownBtnClickHandler={dropdownBtnClickHandler}
          categoryClickHandler={categoryClickHandler}
        />
      ) : (
        <RecipeDropdown
          category={category}
          isOpen={isOpen}
          dropdownBtnClickHandler={dropdownBtnClickHandler}
          categoryClickHandler={categoryClickHandler}
        />
      )}
    </div>
  );
}

export default Category;
