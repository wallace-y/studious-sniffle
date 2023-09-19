import {
  ActivityIndicator,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button, Text, Searchbar } from "react-native-paper";
import { search } from "../utils/search.js";
import ListOfBooks from "./ListOfBooks.jsx";
import loadingData from "../assets/data.js";

export default function SearchBar({ navigation }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(loadingData);

  async function handleSearch() {
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
          <Text variant="displaySmall">Book Scroller</Text>
        </View>
        <View>
          <TouchableOpacity onPress={showInfo}>
            <Button icon="information">Info</Button>
          </TouchableOpacity>
        </View>
        <View>
          {error != "" ? (
            <View>
              <Text style={styles.errorMessage} variant="bodyMedium">
                "To err is human; to forgive, divine." - Alexander Pope.
              </Text>
              <Text style={styles.errorMessage} variant="bodyMedium">
                Looks like we have a problem. If you can send a screenshot of
                the issue we can investigate further.
              </Text>
              <Text style={styles.errorMessage} variant="bodyMedium">
                Error: {error}
              </Text>
            </View>
          ) : (
            false
          )}
          {/* conditionally loading the search bar */}
          {loading ? (
            <View>
              <Text variant="bodyLarge">
                Please Wait..."Of human virtues, patience is most great" - Cato
                the Elder
              </Text>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Searchbar
                placeholder="Search"
                onChangeText={(text) => setQuery(text)}
                onSubmitEditing={handleSearch}
                value={query}
              />
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

  header: {
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
  },
  errorMessage: {
    marginBottom: 5,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  list: {
    marginBottom: 150,
  },
});
