import { useState } from "react";
import AddItemBtn from "../../components/buttons/AddItemBtn";
import InventoryList from "./inventoryList/InventoryList";
import SearchBar from "./search/SearchBar";
import classes from "./Inventory.module.css";
import AddItemForm from "./addItemForm/AddItemForm";
import EditMoveDelete from "../../components/editDeleteMove/EditMoveDelete";
// import categoryObj from "../../utils/categoryObj";

function Inventory() {
  // state for category select(allFood, fridge, freezer, pantry)
  // save as ('0','1','2','3') refer to the categoryObj.js in utils
  const [category, setCategory] = useState("0");
  // search state from search component
  const [searchString, setSearchString] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelctedId] = useState("");

  return (
    <div data-testid="inventory-component" className={classes.container}>
      <div className={classes["inventory-header"]}>
        <SearchBar
          category={category}
          setCategory={setCategory}
          searchString={searchString}
          setSearchString={setSearchString}
        />
      </div>
      <div className={classes["inventory-list"]}>
        <InventoryList
          category={category}
          searchString={searchString}
          selectedId={selectedId}
          setSelctedId={setSelctedId}
        />

        {!openForm && selectedId && (
          <EditMoveDelete
            type="inventory"
            selectedId={selectedId}
            setSelctedId={setSelctedId}
          />
        )}
        {!openForm && !selectedId && (
          <AddItemBtn type="inventory" callbackFn={setOpenForm} />
        )}
        {openForm && <AddItemForm setOpenForm={setOpenForm} />}
      </div>
    </div>
  );
}

export default Inventory;
