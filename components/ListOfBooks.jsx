import React, { useRef, useState } from "react";
import axios from "axios";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Text,
  AccessibilityInfo,
} from "react-native";

const Item = ({ title, cover, worksKey, index }) => {
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
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`https://openlibrary.org${worksKey}`);
        }}
        accessibilityLabel={title}
      >
        <Image
          style={styles.cover}
          source={{
            uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const ListOfBooks = ({ data }) => {
  const flatListRef = useRef(null);
  const filteredData = data.filter((item) => item.cover_i);
  const endIndex = Math.min(filteredData.length / 2) - 1;

  const scrollToEnd = async () => {
    if (flatListRef.current) {
      for (let i = 0; i < endIndex; i++) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          flatListRef.current.scrollToIndex({
            index: i,
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          scrollToEnd();
        }}
      >
        <Text style={styles.autoScroll}>Auto Scroll</Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={filteredData}
        numColumns={2}
        renderItem={({ item, index }) => (
          <Item
            index={index}
            cover={item.cover_i}
            title={item.title}
            worksKey={item.key}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  autoScroll: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
  },
  item: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "#f2f2f2",
    elevation: 5,
  },
  itemOne: {
    height: 200,
  },
  itemThree: {
    marginTop: -40,
    height: 250,
  },
  itemLeft: {
    marginTop: -40,
    height: 250,
    marginBottom: 20,
  },
  itemRight: {
    height: 250,
  },
  cover: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 15,
  },
});

export default ListOfBooks;
