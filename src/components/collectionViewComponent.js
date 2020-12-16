import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import COLORS from "../res/colors.js";
import auth from "@react-native-firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

export default CollectionViewComponent = (props) => {
  // props.collectionId is key of collection that should be displays
  [lists, setLists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    //load collection from firestore

    const subscriber = firestore()
      .collection("Lists")
      .doc(props.collectionId)
      //.orderBy("type")
      .onSnapshot((docSnaphot) => {
        console.log(docSnaphot.data())
        setLists(docSnaphot.data().elements);
        })
      
      return () => [subscriber];
    }, []);

  handleItemClick = (item) => {
    if (item.type === "chess") {
      navigation.push("Chess", {
        listId: item.key,
        listName: item.value,
      });
    } else if (item.type === "Collection") {
      // show collection
      navigation.push("CollectionView", {
        collectionId: item.key, //to-do: check if this is correct
        type: "collection",
        name: item.value,
      });
    } else {
      navigation.push("ListView", {
        listId: item.key,
        type: item.type,
        name: item.value,
      });
    }
  };

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: isActive
            ? COLORS.main
            : getBackgroundColor(item.type),
          justifyContent: "center",
          padding: 20,
          marginTop: 5,
          borderRadius: 10,
          marginHorizontal: 5,
        }}
        onLongPress={drag}
        onPress={() => handleItemClick(item)}
      >
        <View>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <Text style={styles.listItemSubtitle}>{item.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <DraggableFlatList
      style={styles.lists}
      data={lists}
      renderItem={renderItem}
      keyExtractor={(item, index) => `draggable-item-${item.key}`}
      onDragEnd={(lists) => {
        setLists(lists.data);
      }}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 0,
    borderRadius: 100,
  },
  floating: {},
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.second,
    marginRight: 10,
  },
  okButton: {
    backgroundColor: COLORS.main,
    marginTop: 20,
  },
  listItemTitle: {
    fontSize: 16,
  },
  listItemSubtitle: {
    fontSize: 13,
  },
});
