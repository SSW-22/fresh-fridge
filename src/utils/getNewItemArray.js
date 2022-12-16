const getNewItemArray = (previousItems, newItem) => {
  let prevArray = previousItems;
  const existItem = previousItems.find((item) => item.id === newItem.id);

  if (!existItem) {
    prevArray.push(newItem);
  } else if (newItem.name) {
    prevArray = prevArray.map((item) =>
      item.id !== existItem.id ? item : newItem,
    );
    return prevArray;
  } else {
    prevArray = prevArray.filter((item) => item.id !== newItem.id);
    return prevArray;
  }
  return prevArray;
};

export default getNewItemArray;
