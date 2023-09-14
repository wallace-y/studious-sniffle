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

const Item = ({ title, cover, index }) => {
  let itemStyle = styles.itemLeft; // Default style

  if (index === 0) {
    itemStyle = styles.itemOne;
  } else if (index === 2) {
    itemStyle = styles.itemThree;
  } else if (index % 2 !== 0) {
    itemStyle = styles.itemRight;
  }
  return (
    <View style={[styles.item, itemStyle]}>
      <Image
        style={index === 0 ? styles.coverShort : styles.cover}
        source={{
          uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`,
        }}
      />
      {/* <Text style={styles.title}>{title.substr(0, 16) + "..."}</Text> */}
    </View>
  );
};

const ListOfBooks = ({ data }) => {
  const filteredData = data.filter((item) => item.cover_i);

  return (
    <FlatList
      data={filteredData}
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
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    margin: 8,
    width: "48%",
    position: "relative",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { width: -5, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  itemOne: {
    height: 200,
  },
  itemThree: {
    marginTop: 20,
    height: 250,
  },
  itemLeft: {
    marginTop: 20,
    height: 300,
    marginBottom: 20,
  },
  itemRight: {
    height: 250,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
    position: "absolute", // Position the title absolutely
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: "#fff", // Text color
    padding: 5, // Adjust padding as needed
  },

  cover: {
    width: "96%",
    height: "96%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  coverShort: {
    width: "96%",
    height: "96%",
    resizeMode: "cover",
    borderRadius: 15,
  },
});

export default ListOfBooks;
