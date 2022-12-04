import Category from "./Category";
import Search from "./Search";
import classes from "./SearchBar.module.css";

function SearchBar({ category, setCategory, searchText, setSearchText }) {
  return (
    <div data-testid="search-bar" className={classes["search-bar"]}>
      <Category category={category} setCategory={setCategory} />
      <Search
        category={category}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </div>
  );
}

export default SearchBar;
