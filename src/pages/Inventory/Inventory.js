import { useState } from "react";
import AddItemBtn from "../../components/buttons/AddItemBtn";
import InventoryList from "../../components/inventory/inventoryList/InventoryList";
import { useAppSelector } from "../../hooks/react-redux-hooks";
import SearchBar from "./search/SearchBar";
import classes from "./Inventory.module.css";
// import categoryObj from "../../utils/categoryObj";

function Inventory() {
  // state for category select(allFood, fridge, freezer, pantry)
  // save as ('0','1','2','3') refer to the categoryObj.js in utils
  const [category, setCategory] = useState("0");
  // search state from search component
  const [searchText, setSearchText] = useState("");

  const items = useAppSelector((state) => state.inventory.items);
  return (
    <div data-testid="inventory-component" className={classes.container}>
      <SearchBar
        category={category}
        setCategory={setCategory}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {items.length === 0 && (
        <h1>
          There is no food item here. <br /> click on the add item button to
          store food.
        </h1>
      )}
      {items.length > 0 && <InventoryList />}
      <AddItemBtn type="inventory" />
    </div>
  );
}

export default Inventory;
