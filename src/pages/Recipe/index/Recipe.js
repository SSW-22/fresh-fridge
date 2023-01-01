import { useState } from "react";
import SearchBar from "../../../components/search/SearchBar";
import RecipeList from "../recipeList/RecipeList";
import { useAppSelector } from "../../../hooks/react-redux-hooks";
import classes from "./Recipe.module.css";
import useArrayFilter from "../../../hooks/useArrayFilter";

function Recipe() {
  const [category, setCategory] = useState("0");
  const [searchString, setSearchString] = useState("");

  const searchedRecipes = useAppSelector(
    (state) => state.recipe.searchedRecipes,
  );
  const savedRecipes = useAppSelector((state) => state.recipe.savedRecipes);

  const filteredSavedArray = useArrayFilter(savedRecipes, searchString);

  return (
    <div data-testid="recipe-component" className={classes.container}>
      <div className={classes["recipe-header"]}>
        <SearchBar
          category={category}
          setCategory={setCategory}
          setSearchString={setSearchString}
          searchString={searchString}
          type="recipe"
        />
      </div>
      <div className={classes["recipe-list"]}>
        <RecipeList
          searchString={searchString}
          category={category}
          recipes={category === "0" ? searchedRecipes : filteredSavedArray}
        />
      </div>
    </div>
  );
}

export default Recipe;
