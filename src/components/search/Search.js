import { useState } from "react";
import { BiSearch, BiArrowBack } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../hooks/react-redux-hooks";
import { searchRecipe } from "../../store/recipeSlice";
// import apiCall from "../../api/recipe-api";
import {
  inventoryCategoryObj,
  recipeCategoryObj,
} from "../../utils/categoryObj";
import classes from "./Search.module.css";

function Search({ category, setSearchString, searchString, type }) {
  const dispatch = useAppDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [inputString, setInputString] = useState("");

  const status = useAppSelector((state) => state.recipe.searchedRecipes.status);

  const SearchClickHandler = (e) => {
    e.preventDefault();
    setIsSearchOpen((prev) => !prev);
  };

  const onCloseHandler = (e) => {
    e.preventDefault();
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      setIsSearchOpen(false);
    }, 300);
    setInputString("");
    setSearchString("");
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setInputString(e.target.value);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (type === "inventory") {
      setSearchString(inputString);
    }
    if (type === "recipe" && category === "1") {
      setSearchString(inputString);
    }
    if (type === "recipe" && category === "0") {
      // name,instructions,video_url,canonical_id,sections
      if (
        inputString.replace(/\s/g, "").length > 0 &&
        searchString !== inputString
      ) {
        try {
          // let data = await apiCall(inputString);
          // data = data
          //   .map((item) => {
          //     return {
          //       id: item.canonical_id,
          //       name: item.name,
          //       instructions: item.instructions,
          //       video_url: item.original_video_url,
          //       sections: item.sections,
          //     };
          //   })
          //   .filter((item) => item.instructions && item.sections);
          setSearchString(inputString);
          // dispatch(recipeActions.searchRecipe(data));
          // console.log(searchString);
          dispatch(searchRecipe(inputString));
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`${classes.container} ${
        isSearchOpen ? `${classes.search}` : ""
      } ${animation ? `${classes.close}` : ""}`}
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
          <button
            type="submit"
            className={classes["submit-btn"]}
            data-testid="submit-test"
            disabled={status === "loading"}
          >
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
