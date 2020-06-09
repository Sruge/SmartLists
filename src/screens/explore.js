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
import Icon from "react-native-vector-icons/AntDesign";

export default Explore = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [lists, setLists] = useState([]); // Initial empty array of users
  const navigation = useNavigation();
  const route = useRoute();
  const [favLists, setFavLists] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("Users")
      .doc(route.params.user)
      .onSnapshot((documentSnapshot) => {
        const entries = [];
        if (documentSnapshot.get("favLists") !== undefined) {
          Object.entries(documentSnapshot.get("favLists")).forEach((val) => {
            entries.push(val);
          });
        }
        setFavLists(entries);
        console.log(route.params.user, favLists);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .where("pub", "==", true)
      .onSnapshot((querySnapshot) => {
        const lists = [];
        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            let fav = false;
            if (documentSnapshot.id in favLists) {
              fav = true;
            }
            lists.push({
              value: documentSnapshot.get("name"),
              key: documentSnapshot.id,
              len: documentSnapshot.get("elements").length.toString(),
              multiValue: documentSnapshot.get("multiValue"),
              type: documentSnapshot.get("type"),
              fav: fav,
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
        name: item.value,
      });
    } else {
      navigation.push("ListView", {
        listId: item.key,
        multiValue: item.multiValue,
        name: item.value,
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

  circlePressed = () => {
    console.log("circle pressed");
  };

  renderItem = ({ item, index, drag, isActive }) => {
    console.log(item.fav);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "yellow",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: 60,
            backgroundColor: isActive ? COLORS.main : "white",
            justifyContent: "center",
            padding: 15,
            marginTop: 5,
            borderRadius: 10,
          }}
          onLongPress={drag}
          onPress={() => handleItemClickExplore(item)}
        >
          <View style={{ flex: 5 }}>
            <Text
              style={{
                color: "#555",
                fontSize: 16,
              }}
            >
              {item.value}
            </Text>
            <Text
              style={{
                color: "#555",
                fontSize: 13,
              }}
            >
              # {item.len}
            </Text>
          </View>
        </TouchableOpacity>
        <Icon
          onPress={circlePressed}
          name={item.fav ? "checkcircle" : "checkcircleo"}
          color="#333"
          size={24}
        />
      </View>
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
        onDragEnd={(lists) => {
          setLists(lists.data);
        }}
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
    marginRight: 10,
  },
});
