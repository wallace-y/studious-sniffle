import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";

const Item = ({ title, cover, index }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title || "unknown"}</Text>

    <Image
      style={styles.cover}
      source={{
        uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`
      }}
    />
  </View>
);

const ListOfBooks = ({ data }) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({ item, index }) => (
        <Item index={index} cover={item.cover_i} title={item.title} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 5,
    margin: 8,
    width: "50%"
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5
  },
  cover: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  cover_short: {
    width: "100%",
    height: 150,
    resizeMode: "cover"
  },
});

export default ListOfBooks;
