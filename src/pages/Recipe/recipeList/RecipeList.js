// import classes from "./RecipeList.module.css";
import { useAppSelector } from "../../../hooks/react-redux-hooks";

function RecipeList() {
  const searchedRecipes = useAppSelector(
    (state) => state.recipe.searchedRecipes,
  );
  return (
    <div data-testid="recipe-list-test">
      {searchedRecipes.length === 0 && (
        <div data-testid="recipe-no-item-test">
          <p>
            There is no recipe here.
            <br /> Click on the search button to look for recipes to save.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
