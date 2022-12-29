import classes from "./NoResult.module.css";

function NoResult() {
  return (
    <div className={classes["no-item"]}>
      <p>No results found.</p>
    </div>
  );
}

export default NoResult;
