import AddItemBtn from "../../components/buttons/AddItemBtn";
import InventoryList from "../../components/inventory/inventoryList/InventoryList";
import { useAppSelector } from "../../hooks/react-redux-hooks";
import classes from "./Inventory.module.css";

function Inventory() {
  const items = useAppSelector((state) => state.inventory.items);
  return (
    <div data-testid="inventory-component" className={classes.container}>
      <div>Search bar</div>
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
