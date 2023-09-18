# React Native Book Search App

The app allows users to search for books by entering keywords, and it displays a list of book covers that match the search criteria. Additionally, the app provides an "Auto Scroll" feature to scroll through the list of book covers automatically.

## Project Structure

The project consists of several components and files:

### SearchBar.jsx

The `SearchBar.jsx` component is the main component responsible for handling user input and displaying search results. It includes the following features:

- A search input field that allows users to enter their query.
- A "Search" button to initiate the search.
- Error handling for invalid queries.
- An "Auto Scroll" button to automatically scroll through the list of book covers.
- Loading indicators and messages for search progress.
- Navigation to an "Info" screen.

### ListOfBooks.jsx

The `ListOfBooks.jsx` component displays the list of book covers based on the search results. Key features include:

- A FlatList that organizes book covers into a grid.
- An "Auto Scroll" button to trigger automatic scrolling.
- Handling of book cover images and links to Open Library for more details.

### search.js

The `search.js` file contains a function for querying the Open Library API to search for books based on user input. It uses the Axios library for making HTTP requests to the Open Library API.

### package.json

The `package.json` file contains project metadata, including dependencies and scripts for running the app on different platforms (Android, iOS, and web).


## Dependencies

The project utilizes the following major dependencies:

- `axios`: Used for making HTTP requests to the Open Library API.
- `react-native`: The core library for building the React Native app.
- `expo`: Provides tools and libraries for developing React Native apps.

## Additional Notes

- The app uses the Open Library API to fetch book data based on user queries. Ensure that you have an internet connection to use this functionality.

- The "Auto Scroll" feature in the `ListOfBooks.jsx` component allows users to automatically scroll through the list of book covers. It uses a `FlatList` and the `scrollToIndex` function to achieve this.

- The app includes error handling for cases where the user enters an empty query or experiences other issues during the search process.

- Feel free to customize and extend the app to add more features or improve the user interface.


