const axios = require("axios");

base_url = "https://openlibrary.org/search.json?q=";
q = "the+lord+of+the+rings";
l = 10;

// To Do: add sort functionality as per open library docs
// https://openlibrary.org/dev/docs/api/search

function search(query, limit) {
  let data = null;
  axios
    .get(`${base_url}${query}&limit=${limit}`)
    .then((res) => {
      data = res.data;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.export = search;
