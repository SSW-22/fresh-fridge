import { useState } from "react";
import AddItemBtn from "../../components/buttons/AddItemBtn";
import InventoryList from "./inventoryList/InventoryList";
import SearchBar from "./search/SearchBar";
import classes from "./Inventory.module.css";
import AddItemForm from "./addItemForm/AddItemForm";
// import categoryObj from "../../utils/categoryObj";

function Inventory() {
  // state for category select(allFood, fridge, freezer, pantry)
  // save as ('0','1','2','3') refer to the categoryObj.js in utils
  const [category, setCategory] = useState("0");
  // search state from search component
  const [searchString, setSearchString] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelctedId] = useState("");

  // const items = useAppSelector((state) => state.inventory.items);
  return (
    <div data-testid="inventory-component" className={classes.container}>
      <SearchBar
        category={category}
        setCategory={setCategory}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      {!openForm && (
        <InventoryList
          category={category}
          searchString={searchString}
          selectedId={selectedId}
          setSelctedId={setSelctedId}
        />
      )}
      {!openForm && selectedId && (
        <div className={classes["btn-box"]}>
          <button type="button">edit</button>
          <button type="button">move to</button>
          <button type="button">delete</button>
        </div>
      )}
      {!openForm && !selectedId && (
        <AddItemBtn type="inventory" callbackFn={setOpenForm} />
      )}
      {openForm && <AddItemForm setOpenForm={setOpenForm} />}
      {/* {openForm ? (
        <AddItemForm setOpenForm={setOpenForm} />
      ) : (
        <AddItemBtn type="inventory" callbackFn={setOpenForm} />
      )} */}
    </div>
  );
}

export default Inventory;
