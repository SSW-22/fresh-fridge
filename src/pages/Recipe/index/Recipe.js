import { useState } from "react";
import SearchBar from "../../../components/search/SearchBar";
import RecipeList from "../recipeList/RecipeList";
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
          type="recipe"
        />
        <RecipeList searchString={searchString} category={category} />
      </div>
    </div>
  );
}

export default Recipe;
