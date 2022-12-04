import { useState } from "react";
import { BiSearch, BiArrowBack } from "react-icons/bi";
import categoryObj from "../../../utils/categoryObj";
import classes from "./Search.module.css";

function Search({ category, searchText, setSearchText }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const SearchClickHandler = (e) => {
    e.preventDefault();
    setIsSearchOpen((prev) => !prev);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <div className={isSearchOpen && `${classes.search}`}>
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
            onClick={SearchClickHandler}
            className={classes["search-back"]}
          >
            <BiArrowBack color="#ffffff" size={20} />
          </button>
          <input
            type="text"
            name="text"
            placeholder={`Search ${categoryObj[category]}`}
            value={searchText}
            onChange={onChangeHandler}
          />
          <BiSearch
            className={classes["search-textbox-icon"]}
            color="black"
            size={20}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
