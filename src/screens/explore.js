import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "react-native-elements";
=======
import { StyleSheet, ActivityIndicator, FlatList, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, Header } from "react-native-elements";
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../res/colors.js";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";

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
              multiValue:
                documentSnapshot.get("type") === "multiValue" ? true : false,
              type: documentSnapshot.get("type"),
            });
          });

          setLists(lists);
        }
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => [subscriber];
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size={"large"} style={styles.activityIndicator} />
    );
  }

  handleItemClickExplore = (item) => {
    if (item.type === "chess") {
      navigation.push("Chess", {
        listId: item.key,
<<<<<<< HEAD
        name: item.value,
=======
        listName: item.value,
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
      });
    } else {
      navigation.push("ListView", {
        listId: item.key,
<<<<<<< HEAD
        type: item.type,
        name: item.value,
=======
        listName: item.value,
        multiValue: item.multiValue,
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
      });
    }
  };

  handleLongPress = (item) => {
    navigation.push("EditList", {
      listName: item.key,
      user: route.params.user,
      multiValue: item.type === "multivalue" ? true : false,
    });
  };

  getBackgroundColor = (type) => {
    switch (type) {
      case "chess":
        return "#700353";
      case "multivalue":
        return "#FFBFB7";
      case "collection":
        return "#4C1C00";
      default:
        return "#FFD447";
    }
  };

  renderItem = ({ item, index, drag, isActive }) => {
    let col = "white";
    if (item.type === "chess") {
      col = "red";
    }
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
        onLongPress={() => handleLongPress(item)}
        onPress={() => handleItemClickExplore(item)}
      >
        <View>
          <Text style={styles.listItemTitle}>{item.value}</Text>
          <Text style={styles.listItemSubtitle}>{item.len}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        ViewComponent={LinearGradient} // Don't forget this!
        containerStyle={{ height: 60 }}
        linearGradientProps={{
<<<<<<< HEAD
          colors: [COLORS.main, "white"],
          start: { x: 0, y: 0.1 },
          end: { x: 1, y: 0.1 },
        }}
        centerComponent={<Text style={styles.headerText}>Explore</Text>}
      />
      <FlatList
        style={styles.list}
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={(lists) => {
          setLists(lists.data);
        }}
=======
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
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
<<<<<<< HEAD
    marginRight: 10,
  },
  listItemTitle: {
    fontSize: 16,
  },
  listItemSubtitle: {
    fontSize: 13,
  },
=======
    //marginTop: -15,
    marginRight: 10,
  },
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
});
