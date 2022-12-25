import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import Header from "../../components/header/Header";
import SetNumber from "../../components/setNumber/SetNumber";
import Logout from "./Logout";
import classes from "./Profile.module.css";
import { inventoryActions } from "../../store/inventorySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/react-redux-hooks";
import { firebaseReminderDateUpdate } from "../../utils/firebaseDataUpdate";

function Profile() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.inventory);
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!number) {
      setIsValid(false);
      return;
    }
    dispatch(inventoryActions.addReminderDays(number));
    firebaseReminderDateUpdate(userData, number);
    setNumber("");
  };
  return (
    <div data-testid="profile-component" className={classes.container}>
      <Header>
        <BsFillPersonFill size={23} color="#ffffff" />
        <p>Settings</p>
      </Header>
      <div className={classes["text-box"]}>
        <p className={classes["text-box-header"]}>Expiry date reminders</p>
        <p className={classes["text-box-p"]}>
          How many days in advance would you like to see a highlighted indicator
          for your items that are about to expire?
        </p>
        <p className={classes["text-box-reminder"]}>
          Currently, reminders <span>{userData.reminderDays || 0}</span> days
          before
        </p>
        <form
          onSubmit={submitHandler}
          className={classes["submit-handler-box"]}
        >
          <p>Days</p>
          <SetNumber
            number={number}
            setNumber={setNumber}
            setIsValid={setIsValid}
          />
          <p
            className={`${
              isValid ? classes["err-msg"] : classes["err-msg-active"]
            }`}
          >
            Please enter a quantity
          </p>
          <button
            className={classes["submit-btn"]}
            type="submit"
            disabled={!isValid}
          >
            <MdOutlineSaveAlt color="#ffffff" size={15} />
            Save changes
          </button>
        </form>
      </div>
      <div className={classes["btn-box"]}>
        <p className={classes["text-box-header"]}>Logout</p>
        <Logout />
      </div>
      <footer>
        <ul>
          <li>
            <p>© 2022 freshfridge.ca</p>
          </li>
          <li>Contact Us</li>
          <li>Third Party Licenses</li>
        </ul>
      </footer>
    </div>
  );
}

export default Profile;
