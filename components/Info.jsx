import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";

const Info = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Info</Text>
      <Text style={styles.description}>
        This project was built using the Open Library's free API. The project
        displays a list of book covers matching the search criteria for you to
        scroll through.
      </Text>
      <Text style={styles.description}>
        Read more about the Open Library{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://openlibrary.org/")}
        >
          here
        </Text>
        .
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://github.com/wallace-y")}
      >
        <Text style={styles.buttonText}>Find me on GitHub</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://github.com/wallace-y/studious-sniffle")
        }
      >
        <Text style={styles.buttonText}>Read the source code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#483d8b",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
