import moment from "moment";
import { AiFillCheckCircle } from "react-icons/ai";
import classes from "./ListItem.module.css";

function ListItem({ item, selectedId, setSelctedId }) {
  const timeDiff = moment(item.expireDate).diff(moment(new Date()), "days") + 1;
  const timeDiffMonth = Math.floor(timeDiff / 30);
  const expireDate = moment(item.expireDate).format("MM/DD/YYYY");

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
          {timeDiffMonth < 1 && timeDiff > 0 && (
            <p className={classes["textbox-date"]}>
              Expires in {timeDiff} {timeDiff === 1 ? "day" : "days"}
            </p>
          )}
          {timeDiffMonth < 12 && timeDiffMonth >= 1 && (
            <p className={classes["textbox-date"]}>
              Expires in {timeDiffMonth}{" "}
              {timeDiffMonth === 1 ? "month" : "months"}
            </p>
          )}
          {timeDiffMonth >= 12 && (
            <p className={classes["textbox-date"]}>Expires on {expireDate}</p>
          )}
          {timeDiff < 1 && (
            <p className={classes["textbox-date"]} id={classes.expired}>
              Expired
            </p>
          )}
        </div>
        <div className={classes["textbox-right"]}>
          <p>{item.qty} in stock</p>
          <AiFillCheckCircle
            size={17.5}
            className={`${
              selectedId === item.id ? classes["icon-selected"] : classes.icon
            }`}
          />
        </div>
      </div>
    </li>
  );
}

export default ListItem;
