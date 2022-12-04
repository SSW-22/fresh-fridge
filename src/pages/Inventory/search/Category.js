import { useState, useRef, useEffect } from "react";
import { IoHomeSharp, IoSnow } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillInboxesFill } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import categoryObj from "../../../utils/categoryObj";
import classes from "./Category.module.css";

function Category({ category, setCategory }) {
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
      <div className={classes.header}>
        {category === "0" && <IoHomeSharp size={20} color="#ffffff" />}
        {category === "1" && <RiFridgeFill size={20} color="#ffffff" />}
        {category === "2" && <IoSnow size={20} color="#ffffff" />}
        {category === "3" && <BsFillInboxesFill size={20} color="#ffffff" />}
        <p>{categoryObj[category]}</p>
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

export default Category;
