import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";
import { round } from "react-native-reanimated";
import COLORS from "../res/colors.js";
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

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

  renderItem = ({ item, index, drag }) => {
    //console.log(item)
    return (
      <TouchableOpacity
        style={{
          height: 60,
          backgroundColor: "white",
          //alignItems: "center",
          justifyContent: "center",
          marginVertical: 0,
          borderBottomWidth: 0.5,
          marginHorizontal: 5
        }}
        onLongPress={drag}
      ><View>
        <Text
          style={{
            color: "black",
            fontSize: 16,
            marginHorizontal: 10
          }}
        >
          {item.value}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 13,
            marginHorizontal: 10

          }}
        >
          {item.len}
        </Text>
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
          colors: [COLORS.main, "white"],
          start: { x: 0, y: 0.1 },
          end: { x: 1, y: 0.1 },
        }}
        centerComponent={<Text style={styles.headerText}>Explore</Text>}
        />
      <DraggableFlatList
        style={styles.list}
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={( lists ) => {
         console.log(lists.data)
          setLists(lists.data)}
        }
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.second,
    marginRight: 10,
  },
});
