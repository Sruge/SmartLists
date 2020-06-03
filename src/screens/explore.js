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

const actions = [
  {
    text: "New List",
    name: "bt_accessibility",
    position: 0,
    color: "#f4511e",
  },
];

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

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            value: documentSnapshot.get("name"),
            key: documentSnapshot.id,
            len: documentSnapshot.get("elements").length.toString(),
            multiValue: documentSnapshot.get("multiValue"),
          });
        });

        setLists(lists);
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
    navigation.navigate("ListView", {
      listId: item.key,
      multiValue: item.multiValue,
    });
  };

  handleAddClickExplore = (item) => {
    navigation.navigate("AddList", {
      listName: item.key,
      userEmail: route.params.userEmail,
    });
  };

  handleLongPress = (item) => {
    navigation.navigate("EditList", {
      listName: item.key,
      userEmail: route.params.userEmail,
      multiValue: item.multiValue,
    });
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.value}
        subtitle={item.len}
        key={item.key}
        chevron={{ color: "black" }}
        onPress={() => handleItemClickExplore(item)}
        style={styles.listItem}
        bottomDivider
        onLongPress={() => handleLongPress(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.list} data={lists} renderItem={renderItem} />
      <FloatingAction
        onPressItem={(item) => handleAddClickExplore(item)}
        actions={actions}
        color={"#f4511e"}
        overlayColor={"transparent"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
  },
});
