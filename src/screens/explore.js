import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, Header } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../res/colors.js";

const actions = [
  {
    text: "New List",
    name: "addList",
    position: 0,
    color: COLORS.main,
  },
];

export default Explore = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [lists, setLists] = useState([]); // Initial empty array of users
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => { //load public lists from firestore and save in state variable 'lists'
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
        listName: item.value,
      });
    } else {
      navigation.push("ListView", {
        listId: item.key,
        listName: item.value,
        multiValue: item.multiValue,
      });
    }
  };

  handleAddClickExplore = (item) => {
    navigation.push("AddList", {
      listName: item.key,
      userEmail: route.params.userEmail,
    });
  };

  handleLongPress = (item) => {
    navigation.push("EditList", {
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
        round="10"
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
      <Header
        ViewComponent={LinearGradient} // Don't forget this!
        containerStyle={{ height: 60 }}
        linearGradientProps={{
          colors: [COLORS.main, COLORS.step1],
          start: { x: 0, y: 0.1 },
          end: { x: 1, y: 0.1 },
        }}
        centerComponent={<Text style={styles.headerText}>Public lists</Text>}
      />
      <FlatList style={styles.list} data={lists} renderItem={renderItem} />
      <FloatingAction
        onPressItem={(item) => handleAddClickExplore(item)}
        actions={actions}
        color={COLORS.main}
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.second,
    //marginTop: -15,
    marginRight: 10,
  },
});
