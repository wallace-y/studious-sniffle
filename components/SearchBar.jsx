import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { search } from "../utils/search.js";
import ListOfBooks from "./ListOfBooks.jsx";
import loadingData from "../assets/data.js";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(loadingData);
  const [page, setPage] = useState(1);

  async function handleSearch(e) {
    // prevent default form behaviour
    e.preventDefault();
    setLoading(true);
    // check for valid query then execute
    if (query !== "") {
      try {
        // get input form search API
        await search(query).then((res) => {
          setData(res);
        });
      } catch (err) {
        console.log("or here", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        setError("");
      }
    } else {
      setError("Invalid search query: Query cannot be empty");
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View>
          <Text style={styles.title}>Book Scroller</Text>
          {error != "" ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorMessage}>
                "To err is human; to forgive, divine." - Alexander Pope.
              </Text>
              <Text style={styles.errorMessage}>
                Looks like we have a problem. If you can send a screenshot of
                the issue we can investigate further.
              </Text>
              <Text style={styles.errorMessage}>Error: {error}</Text>
            </View>
          ) : (
            false
          )}
        </View>
        <View>
          {/* conditionally loading the search bar */}
          {loading ? (
            <View>
              <Text style={styles.loadingMessage}>
                Please Wait..."Of human virtues, patience is most great" - Cato
                the Elder
              </Text>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setQuery(text)}
                value={query}
                placeholder="What are you looking for?"
              ></TextInput>
              <View style={styles.buttonContainer}>
                <Button
                  color="#483d8b"
                  onPress={handleSearch}
                  title="Search"
                ></Button>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Search Bar Output conditionally loaded */}
      {data.length != 0 ? (
        <SafeAreaView style={styles.list}>
          <ListOfBooks data={data} />
        </SafeAreaView>
      ) : (
        false
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {},
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
  searchBar: {
    borderBottomWidth: 2,
  },
  title: {
    paddingTop: 40,
    fontWeight: "bold",
    width: "100%",
    fontSize: 32,
    textAlign: "center",
  },
  loadingMessage: {
    padding: 5,
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMessage: {
    padding: 5,
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#b22222",
  },
  inputContainer: {
    alignSelf: "center",
    width: "90%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  list: {
    marginBottom: 150,
  },
});
