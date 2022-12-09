import { useState } from "react";
import AddItemBtn from "../../components/buttons/AddItemBtn";
import InventoryList from "./inventoryList/InventoryList";
import SearchBar from "./search/SearchBar";
import classes from "./Inventory.module.css";
import AddItemForm from "./addItemForm/AddItemForm";
import EditMoveDeleteBtn from "../../components/editDeleteMoveBtn/EditMoveDeleteBtn";
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
      {!openForm && selectedId && <EditMoveDeleteBtn />}
      {!openForm && !selectedId && (
        <AddItemBtn type="inventory" callbackFn={setOpenForm} />
      )}
      {openForm && <AddItemForm setOpenForm={setOpenForm} />}
    </div>
  );
}

export default Inventory;
