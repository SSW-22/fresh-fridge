import classes from "./Loading.module.css";

function Loading() {
  return (
    <div className={classes.loading}>
      <div className={classes["loading-spinner"]} />
      Loading
    </div>
  );
}

export default Loading;
