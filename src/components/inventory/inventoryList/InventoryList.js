/* eslint-disable react/prop-types */
import { useAppSelector } from "../../../hooks/react-redux-hooks";
import ListItem from "../listItem/ListItem";

function InventoryList() {
  const items = useAppSelector((state) => state.inventory.items);

  return (
    <ul>
      {items.map((item) => (
        <ListItem item={item.name} key={item.id} />
      ))}
    </ul>
  );
}

export default InventoryList;
