const useArrayFilter = (array, searchString) => {
  const searchArray = [];

  array.map(
    (element) =>
      element.name.toLowerCase().includes(searchString.toLowerCase()) &&
      searchArray.push(element),
  );

  //   console.log(
  //     array[0].sections[0].components[0].ingredient.name
  //       .toLowerCase()
  //       .includes(searchString.toLowerCase()),
  //   );
  return searchArray;
};

export default useArrayFilter;
