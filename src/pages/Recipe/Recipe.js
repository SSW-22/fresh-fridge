import { useEffect } from "react";
// import apiCall from "../../api/recipe-api";

function Recipe() {
  useEffect(() => {
    // apiCall("onion apple carrot");
  }, []);
  return <div data-testid="recipe-component">Recipe Component</div>;
}

export default Recipe;
