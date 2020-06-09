import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";
import { round } from "react-native-reanimated";
import COLORS from "../res/colors.js";
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default Explore = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [lists, setLists] = useState([]); // Initial empty array of users
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .where("pub", "==", true)
      .onSnapshot((querySnapshot) => {
        const lists = [];
        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            lists.push({
              value: documentSnapshot.get("name"),
              key: documentSnapshot.id,
              len: documentSnapshot.get("elements").length.toString(),
              multiValue: documentSnapshot.get("multiValue"),
              type: documentSnapshot.get("type"),
            });
          });

          setLists(lists);
        }
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size={"large"} style={styles.activityIndicator} />
    );
  }

  handleItemClickExplore = (item) => {
    console.log(item.type);
    if (item.type === "chess") {
      navigation.push("Chess", {
        listId: item.key,
      });
    } else {
      navigation.push("ListView", {
        listId: item.key,
        multiValue: item.multiValue,
      });
    }
  };

  handleLongPress = (item) => {
    navigation.push("EditList", {
      listName: item.key,
      user: route.params.user,
      multiValue: item.multiValue,
    });
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.value}
        subtitle={item.len}
        key={item.key}
        round="50"
        chevron={{ color: "black" }}
        onPress={() => handleItemClickExplore(item)}
        style={styles.listItem}
        bottomDivider
        //onLongPress={() => handleLongPress(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        style={styles.list}
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={({ entries }) => this.setLists({ entries })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "red",
  },
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
  },
});
