import Category from "./Category";
import Search from "./Search";
import classes from "./SearchBar.module.css";

function SearchBar({ category, setCategory, setSearchString, type }) {
  return (
    <div data-testid="search-bar" className={classes["search-bar"]}>
      <Category category={category} setCategory={setCategory} type={type} />
      <Search
        category={category}
        setSearchString={setSearchString}
        type={type}
      />
    </div>
  );
}

export default SearchBar;
