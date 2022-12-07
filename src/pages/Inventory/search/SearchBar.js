import Category from "./Category";
import Search from "./Search";
import classes from "./SearchBar.module.css";

function SearchBar({ category, setCategory, searchString, setSearchString }) {
  return (
    <div data-testid="search-bar" className={classes["search-bar"]}>
      <Category category={category} setCategory={setCategory} />
      <Search
        category={category}
        searchString={searchString}
        setSearchString={setSearchString}
      />
    </div>
  );
}

export default SearchBar;
