import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  }
});
