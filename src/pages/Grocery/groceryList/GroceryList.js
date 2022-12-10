import { useAppSelector } from "../../../hooks/react-redux-hooks";

function GroceryListname() {
  const items = useAppSelector((state) => state.grocery.items);
  return (
    <div data-testid="grocery-list">
      {items.length === 0 && (
        <div>
          <p>
            There is no grocery item here.
            <br /> Click on the add item button to list things to buy.
          </p>
        </div>
      )}
    </div>
  );
}

export default GroceryListname;
