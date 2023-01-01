import NoResult from "../../../components/search/NoResult";
import RecipeListItem from "./RecipeListItem";
import classes from "./RecipeList.module.css";

function RecipeList({ searchString, category, recipes }) {
  return (
    <div data-testid="recipe-list-test" className={classes["recipe-list"]}>
      <div>
        {recipes.length > 0 && (
          <ul>
            <p className={classes["recipe-list-number"]}>
              {recipes.length} recipes found.
            </p>
            {recipes.map((item) => (
              <RecipeListItem key={item.id} category={category} item={item} />
            ))}
          </ul>
        )}
      </div>
      {recipes.length === 0 && searchString && (
        <div>{recipes.length === 0 && <NoResult />}</div>
      )}
      {recipes.length === 0 && !searchString && (
        <div data-testid="recipe-no-item-test" className={classes["no-item"]}>
          {category === "0" ? (
            <p>
              There is no recipe here.
              <br /> Click on the search button to look for recipes.
            </p>
          ) : (
            <p>
              There is no recipe here.
              <br />
              Select search recipe on the dropdown to look for recipes to save.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
