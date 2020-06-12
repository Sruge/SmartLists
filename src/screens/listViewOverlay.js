import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

export default ListViewOverlay = (props) => {
  handleDelete = () => {
    firestore()
      .collection("Lists")
      .doc(props.listId)
      .delete()
      .then(console.log("deleted"));
    toggleOverlay();
    props.navigation.navigate("Home");
  };

  getColls = async () => {
    console.log(props.user);
    const lists = await firestore()
      .collection("Lists")
      .where("creator", "==", props.user)
      .where("type", "==", "collection")
      .get("name")
      .then((result) => {
        console.log("result: ", result);
      });
    console.log(lists);
  };

  handleAddToColl = () => {
    console.log("add to coll pressed");
    const colls = getColls();
  };

  //console.log(props.lists)
  return (
    <View>
      <TouchableOpacity
        onPress={() => handleDelete()}
        style={styles.editButtons}
      >
        <Text>DELETE LIST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  editButtons: {
    backgroundColor: "red",
    padding: 20,
  },
});
