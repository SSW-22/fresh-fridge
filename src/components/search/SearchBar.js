import Category from "./Category";
import Search from "./Search";
import classes from "./SearchBar.module.css";

function SearchBar({
  category,
  setCategory,
  setSearchString,
  searchString = null,
  type,
}) {
  return (
    <div data-testid="search-bar" className={classes["search-bar"]}>
      <Category category={category} setCategory={setCategory} type={type} />
      <Search
        category={category}
        setSearchString={setSearchString}
        searchString={searchString}
        type={type}
      />
    </div>
  );
}

export default SearchBar;
