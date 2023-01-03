// import classes from "./RecipeList.module.css";
import NoResult from "../../../components/search/NoResult";
import { useAppSelector } from "../../../hooks/react-redux-hooks";
import RecipeListItem from "./RecipeListItem";
import classes from "./RecipeList.module.css";

function RecipeList({ searchString, category }) {
  const searchedRecipes = useAppSelector(
    (state) => state.recipe.searchedRecipes,
  );
  return (
    <div data-testid="recipe-list-test" className={classes["recipe-list"]}>
      <div>
        {searchedRecipes.length > 0 && (
          <ul>
            <p className={classes["recipe-list-number"]}>
              {searchedRecipes.length} recipes found.
            </p>
            {searchedRecipes.map((item) => (
              <RecipeListItem key={item.id} category={category} item={item} />
            ))}
          </ul>
        )}
      </div>
      {searchedRecipes.length === 0 && searchString && (
        <div>{searchedRecipes.length === 0 && <NoResult />}</div>
      )}
      {searchedRecipes.length === 0 && !searchString && (
        <div data-testid="recipe-no-item-test" className={classes["no-item"]}>
          <p>
            There is no recipe here.
            <br /> Click on the search button to look for recipes.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
