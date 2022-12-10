import { useAppSelector } from "../../../hooks/react-redux-hooks";
import ListItem from "../../../components/listItem/ListItem";
import classes from "./GroceryList.module.css";

function GroceryListname({ selectedId, setSelctedId }) {
  const items = useAppSelector((state) => state.grocery.items);
  return (
    <div data-testid="grocery-list" className={classes["grocery-list"]}>
      {items.length === 0 && (
        <div className={classes["no-item"]}>
          <p>
            There is no grocery item here.
            <br /> Click on the add item button to list things to buy.
          </p>
        </div>
      )}
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <ListItem
              item={item}
              key={item.id}
              selectedId={selectedId}
              setSelctedId={setSelctedId}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroceryListname;
