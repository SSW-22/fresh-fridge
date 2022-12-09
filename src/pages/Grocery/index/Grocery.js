import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import AddItemBtn from "../../../components/buttons/AddItemBtn";
import Header from "../../../components/header/Header";
import AddGroceryItemForm from "../addItemForm/AddGroceryItemForm";
import classes from "./Grocery.module.css";

function Grocery() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div data-testid="grocery-component" className={classes.container}>
      <Header>
        <FaShoppingCart size={20} color="#ffffff" />
        <p>Things to Buy</p>
      </Header>
      {openForm && <AddGroceryItemForm setOpenForm={setOpenForm} />}
      {!openForm && <AddItemBtn type="grocery" callbackFn={setOpenForm} />}
    </div>
  );
}

export default Grocery;
