import React from "react";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { colors } from "../assets/colors";

const Info = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="displayLarge">Info</Text>
        <Text variant="bodyLarge">
          This project was built using the Open Library's free API. The project
          displays a list of book covers matching the search criteria for you to
          scroll through.
        </Text>
      </View>

      <View style={styles.buttonBox}>
        <Button
          style={styles.button}
          mode="contained"
          textColor="white"
          buttonColor={colors.primary}
          onPress={() => Linking.openURL("https://github.com/wallace-y")}
        >
          Find me on GitHub
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          textColor="white"
          buttonColor={colors.primary}
          onPress={() =>
            Linking.openURL("https://github.com/wallace-y/studious-sniffle")
          }
        >
          Read the source code
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          textColor="white"
          buttonColor={colors.primary}
          onPress={() => navigation.goBack()}
        >
          Go Back
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          textColor="white"
          buttonColor={colors.primary}
          onPress={() =>
            Linking.openURL("https://www.flaticon.com/free-icons/book")
          }
        >
          Book icons
        </Button>
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 15,
  },
  buttonBox: {
    width: "100%",
  },
  button: {
    marginBottom: 5,
  },
});
