import { useState } from "react";
import { BiSearch, BiArrowBack } from "react-icons/bi";
import {
  inventoryCategoryObj,
  recipeCategoryObj,
} from "../../utils/categoryObj";
import classes from "./Search.module.css";

function Search({ category, setSearchString, type }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [inputString, setInputString] = useState("");

  const SearchClickHandler = (e) => {
    e.preventDefault();
    setIsSearchOpen((prev) => !prev);
  };

  const onCloseHandler = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
    setInputString("");
    setSearchString("");
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setInputString(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearchString(inputString);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={isSearchOpen ? `${classes.search}` : ""}
    >
      {!isSearchOpen && (
        <button
          type="button"
          data-testid="search-btn"
          onClick={SearchClickHandler}
          className={classes["search-btn"]}
        >
          <BiSearch color="#ffffff" size={20} />
        </button>
      )}
      {isSearchOpen && (
        <div className={classes["search-textbox"]}>
          <button
            type="button"
            data-testid="back-btn"
            onClick={onCloseHandler}
            className={classes["search-back"]}
          >
            <BiArrowBack color="#ffffff" size={20} />
          </button>
          <input
            type="text"
            name="text"
            placeholder={`Search ${
              type === "inventory"
                ? `${inventoryCategoryObj[category]}`
                : `${
                    category === "0"
                      ? `${"recipe with"}`
                      : `${recipeCategoryObj[category]}`
                  }`
            } `}
            value={inputString}
            onChange={onChangeHandler}
          />
          <button type="submit" className={classes["submit-btn"]}>
            <BiSearch
              className={classes["search-textbox-icon"]}
              color="black"
              size={20}
            />
          </button>
        </div>
      )}
    </form>
  );
}

export default Search;
