import React, { useRef, useState } from "react";
import { Card } from "react-native-paper";
import axios from "axios";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  AccessibilityInfo,
} from "react-native";
import { Button, Text, Divider } from "react-native-paper";
import { colors } from "../assets/colors";

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
    <View style={[styles.item]}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`https://openlibrary.org${worksKey}`);
        }}
        accessibilityLabel={title}
      >
        <Card>
          <Card.Cover
            source={{
              uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`,
            }}
          />
        </Card>
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
      <Button
        style={styles.button}
        mode="contained"
        textColor="white"
        buttonColor={colors.secondary}
        onPress={() => {
          scrollToEnd();
        }}
      >
        Auto Scroll
      </Button>
      <Divider bold="true" />
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
  button: {
    marginBottom: 5,
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
