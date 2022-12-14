/* eslint-disable prettier/prettier */
// import moment from "moment";
import { AiFillCheckCircle } from "react-icons/ai";
import ExpiryDate from "./ExpiryDate";
import classes from "./ListItem.module.css";

function ListItem({ item, selectedId, setSelctedId }) {
  const listClickHandler = (e) => {
    e.preventDefault();
    if (selectedId === item.id) {
      setSelctedId("");
    } else {
      setSelctedId(item.id);
    }
  };
  return (
    <li
      onClick={listClickHandler}
      data-key={item.id}
      role="presentation"
      className={classes["item-list"]}
    >
      <div className={classes["list-textbox"]}>
        <div className={classes["textbox-left"]}>
          <p className={classes["textbox-name"]}>{item.name}</p>
          {item.expireDate && <ExpiryDate date={item.expireDate} />}
        </div>
        <div className={classes["textbox-right"]}>
          <p>
            {item.qty} {item.category ? "in stock" : "to buy"}
          </p>
          <AiFillCheckCircle
            size={17.5}
            className={`${selectedId === item.id ? classes["icon-selected"] : classes.icon
              }`}
          />
        </div>
      </div>
    </li>
  );
}

export default ListItem;
