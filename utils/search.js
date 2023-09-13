import axios from "axios";

base_url = "https://openlibrary.org/search.json?q=";
q = "the+lord+of+the+rings";
l = 10;

// To Do: add sort functionality as per open library docs
// https://openlibrary.org/dev/docs/api/search

async function search(query, limit) {
  try {
    const response = await axios.get(`${base_url}${query}&limit=${limit}`);
    return response.data.docs;
  } catch (error) {
    throw error;
  }
}

export { search };
