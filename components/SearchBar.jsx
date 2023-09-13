import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { search } from "../utils/search.js";
import ListOfBooks from "./ListOfBooks.jsx";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function handleSearch(e) {
    // prevent default form behaviour
    e.preventDefault();
    // set loading state TO DO: Add activity loading
    setLoading(true);
    // check for valid query then execute
    if (query !== "") {
      try {
        // get input form search API
        // TO DO: Limit is hard-coded as 10 for now
        await search(query, 10).then((res) => {
          setData(res);
        });
      } catch (err) {
        console.log("or here", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Invalid search query: Query cannot be empty");
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Book Searcher</Text>

      {error != "" ? (
        <Text>Oops there was an error. "To Err is Human" Error: {error}</Text>
      ) : (
        false
      )}

      {/* conditionally loading the search bar */}
      {loading ? (
        <View>
          <Text>Please Wait...Patience is Virtue</Text>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View>
          <TextInput
            onChangeText={(text) => setQuery(text)}
            value={query}
            placeholder="What are you looking for?"
          ></TextInput>
          <Button onPress={handleSearch} title="Search"></Button>
        </View>
      )}
      {/* Search Bar Output conditionally loaded */}
      {data.length != 0 ? (
        <SafeAreaView>
          <ListOfBooks data={data} />
        </SafeAreaView>
      ) : (
        false
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
