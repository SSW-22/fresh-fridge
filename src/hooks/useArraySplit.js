const useArraySplit = (array, searchString) => {
  const fridge = [];
  const freezer = [];
  const pantry = [];
  const searchArray = [];

  // push element to search array if element includes search string

  array.map(
    (element) =>
      element.name.toLowerCase().includes(searchString.toLowerCase()) &&
      searchArray.push(element),
  );

  if (searchArray.length > 0) {
    // split array by category
    searchArray.forEach((element) => {
      if (element.category === "1") {
        fridge.push(element);
      }
      if (element.category === "2") {
        freezer.push(element);
      }
      if (element.category === "3") {
        pantry.push(element);
      }
    });
    // sort by expirey date
    fridge.sort((a, b) => {
      return new Date(a.expireDate) - new Date(b.expireDate);
    });
    freezer.sort((a, b) => {
      return new Date(a.expireDate) - new Date(b.expireDate);
    });
    pantry.sort((a, b) => {
      return new Date(a.expireDate) - new Date(b.expireDate);
    });
  }

  return [fridge, freezer, pantry];
};

export default useArraySplit;
