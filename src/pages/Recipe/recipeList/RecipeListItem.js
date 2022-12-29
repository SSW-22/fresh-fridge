function RecipeListItem({ key, category, item }) {
  return (
    <li key={key} data-testid="list-item-test">
      {console.log(category)}
      {item.name}
    </li>
  );
}

export default RecipeListItem;
