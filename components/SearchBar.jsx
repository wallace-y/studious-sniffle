import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { search } from "../utils/search.js";
import ListOfBooks from "./ListOfBooks.jsx";
import loadingData from "../assets/data.js";

export default function SearchBar({ navigation }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(loadingData);
  const [page, setPage] = useState(1);

  async function handleSearch(e) {
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

  const showInfo = () => {
    navigation.navigate("Info");
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Scroller</Text>
          <TouchableOpacity onPress={showInfo}>
            <Text style={styles.infoButton}>ℹ️ Info</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>
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
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  searchBar: {
    borderBottomWidth: 2,
  },
  header: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  infoButton: {
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#b22222",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginBottom: 150,
  },
});
