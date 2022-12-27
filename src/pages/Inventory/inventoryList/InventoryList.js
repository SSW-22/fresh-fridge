import { useAppSelector } from "../../../hooks/react-redux-hooks";
import useArraySplit from "../../../hooks/useArraySplit";
import ListItem from "../../../components/listItem/ListItem";
import NoResult from "../../../components/search/NoResult";
import classes from "./InventoryList.module.css";

function InventoryList({ category, searchString, selectedId, setSelctedId }) {
  const items = useAppSelector((state) => state.inventory.items);
  const [fridge, freezer, pantry] = useArraySplit(items, searchString);
  return (
    <div className={classes["inventory-list"]}>
      {items.length === 0 && (
        <div
          data-testid="empty-state-test"
          className={classes["empty-inventory"]}
        >
          <p>
            There is no food item here. <br /> Click on the add item button to
            store food.
          </p>
        </div>
      )}
      {items.length > 0 && (
        <div>
          {category === "0" &&
            fridge.length === 0 &&
            freezer.length === 0 &&
            pantry.length === 0 && <NoResult />}
          <div>
            {(category === "0" || category === "1") && (
              <div className={classes["list-box"]}>
                {fridge.length > 0 && (
                  <div>
                    {category === "0" && (
                      <p className={classes.title}>Fridge</p>
                    )}
                    <ul>
                      {fridge.map((item) => (
                        <ListItem
                          item={item}
                          key={item.id}
                          selectedId={selectedId}
                          setSelctedId={setSelctedId}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                {fridge.length === 0 && category === "1" && <NoResult />}
              </div>
            )}
            {(category === "0" || category === "2") && (
              <div className={classes["list-box"]}>
                {freezer.length > 0 && (
                  <div>
                    {category === "0" && (
                      <p className={classes.title}>Freezer</p>
                    )}
                    <ul>
                      {freezer.map((item) => (
                        <ListItem
                          item={item}
                          key={item.id}
                          selectedId={selectedId}
                          setSelctedId={setSelctedId}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                {freezer.length === 0 && category === "2" && <NoResult />}
              </div>
            )}
            {(category === "0" || category === "3") && (
              <div className={classes["list-box"]}>
                {pantry.length > 0 && (
                  <div>
                    {category === "0" && (
                      <p className={classes.title}>Pantry</p>
                    )}
                    <ul>
                      {pantry.map((item) => (
                        <ListItem
                          item={item}
                          key={item.id}
                          selectedId={selectedId}
                          setSelctedId={setSelctedId}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                {pantry.length === 0 && category === "3" && <NoResult />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryList;
