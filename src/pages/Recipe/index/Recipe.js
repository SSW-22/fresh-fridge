import { useState } from "react";
import SearchBar from "../../../components/search/SearchBar";
import RecipeList from "../recipeList/RecipeList";
// import apiCall from "../../api/recipe-api";
import classes from "./Recipe.module.css";

function Recipe() {
  const [category, setCategory] = useState("0");
  // search state from search component
  const [searchString, setSearchString] = useState("");

  return (
    <div data-testid="recipe-component" className={classes.container}>
      <div className={classes["recipe-header"]}>
        <SearchBar
          category={category}
          setCategory={setCategory}
          setSearchString={setSearchString}
          type="Recipe"
        />
        <RecipeList />
      </div>
      <div className={classes["recipe-list"]}>{searchString}</div>
    </div>
  );
}

export default Recipe;
