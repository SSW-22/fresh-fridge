import AddItem from "../../components/global/buttons/AddItem";
import classes from "./Inventory.module.css";

function Inventory() {
  return (
    <div data-testid="inventory-component" className={classes.container}>
      <div>Search bar</div>
      <h1>
        There is no food item here. <br /> click on the add item button to store
        food.
      </h1>
      <AddItem />
    </div>
  );
}

export default Inventory;
