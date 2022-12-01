import Header from "./Header";
import Logout from "./Logout";
import classes from "./Profile.module.css";

function Profile() {
  return (
    <div data-testid="profile-component" className={classes.container}>
      <Header />
      <div className={classes["text-box"]}>
        <p className={classes["text-box-header"]}>Expiry date reminders</p>
        <p className={classes["text-box-p"]}>
          How many days in advance would you like to see a highlighted indicator
          for your items that are about to expire?
        </p>
      </div>
      <Logout />
    </div>
  );
}

export default Profile;
