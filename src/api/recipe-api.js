// import axios from "axios";

const apiCall = (ingredients) => {
  // check user input ingredients and it must be str and space between each ingredients
  // ex) "onion apple carrot"
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
    },
  };
  const queryString = ingredients.replace(/\s/g, "%20");
  const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&q=${queryString}`;

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => resolve(json.results))
      .catch((err) => reject(err));
  });
};
export default apiCall;
