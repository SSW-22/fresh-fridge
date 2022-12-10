import moment from "moment";
import classes from "./ListItem.module.css";

function ExpiryDate({ date }) {
  const timeDiff = moment(date).diff(moment(new Date()), "days") + 1;
  const timeDiffMonth = Math.floor(timeDiff / 30);
  const expireDate = moment(date).format("MM/DD/YYYY");
  return (
    <div data-testid="expiry-date">
      {timeDiffMonth < 1 && timeDiff > 0 && (
        <p className={classes["textbox-date"]}>
          Expires in {timeDiff} {timeDiff === 1 ? "day" : "days"}
        </p>
      )}
      {timeDiffMonth < 12 && timeDiffMonth >= 1 && (
        <p className={classes["textbox-date"]}>
          Expires in {timeDiffMonth} {timeDiffMonth === 1 ? "month" : "months"}
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
  );
}

export default ExpiryDate;
