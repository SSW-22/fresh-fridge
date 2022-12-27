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
  // const [number, setNumber] = useState("");
  // const [isValid, setIsValid] = useState(true);
  const [number, setNumber] = useState({ qty: "" });
  const [isValid, setIsValid] = useState({
    qty: true,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    // if (!number) {
    //   setIsValid(false);
    //   return;
    // }
    if (!number.qty) {
      setIsValid((prev) => {
        return { ...prev, qty: false };
      });
      return;
    }

    dispatch(inventoryActions.addReminderDays(number.qty));
    firebaseReminderDateUpdate(userData, number.qty);
    setNumber({ qty: "" });
  };
  return (
    <div data-testid="profile-component" className={classes.container}>
      <div className={classes["profile-header"]}>
        <Header>
          <BsFillPersonFill size={23} color="#ffffff" />
          <p>Settings</p>
        </Header>
      </div>
      <div className={classes["profile-main"]}>
        <div className={classes["text-box"]}>
          <p className={classes["text-box-header"]}>Expiry date reminders</p>
          <p className={classes["text-box-p"]}>
            How many days in advance would you like to see a highlighted
            indicator for your items that are about to expire?
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
              type="profile"
            />
            <p
              className={`${
                isValid.qty ? classes["err-msg"] : classes["err-msg-active"]
              }`}
            >
              Please enter a quantity
            </p>
            <button
              className={classes["submit-btn"]}
              type="submit"
              disabled={!isValid.qty}
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
    </div>
  );
}

export default Profile;
