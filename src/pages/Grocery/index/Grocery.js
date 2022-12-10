import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import AddItemBtn from "../../../components/buttons/AddItemBtn";
import Header from "../../../components/header/Header";
import AddGroceryItemForm from "../addItemForm/AddGroceryItemForm";
import EditMoveDeleteBtn from "../../../components/editDeleteMoveBtn/EditMoveDeleteBtn";
import GroceryList from "../groceryList/GroceryList";
import classes from "./Grocery.module.css";

function Grocery() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelctedId] = useState("");

  return (
    <div
      data-testid="grocery-component"
      className={`${classes.container} ${openForm ? classes.between : ""}`}
    >
      <div className={classes.header}>
        <Header>
          <FaShoppingCart size={20} color="#ffffff" />
          <p>Things to Buy</p>
        </Header>
      </div>
      {!openForm && (
        <GroceryList selectedId={selectedId} setSelctedId={setSelctedId} />
      )}
      {!openForm && selectedId && <EditMoveDeleteBtn />}
      {!openForm && !selectedId && (
        <AddItemBtn type="inventory" callbackFn={setOpenForm} />
      )}
      {/* {!openForm && <AddItemBtn type="grocery" callbackFn={setOpenForm} />} */}
      {openForm && <AddGroceryItemForm setOpenForm={setOpenForm} />}
    </div>
  );
}

export default Grocery;