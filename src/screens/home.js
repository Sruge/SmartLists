/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList } from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { ListItem, Header } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../res/colors.js";

export default Home = () => {
  const [lists, setLists] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    console.log(route.params.userEmail);
    // const subscriber = firestore()
    //   .collection("Lists")
    //   .where("creator", "==", route.params.userEmail)
    //   .onSnapshot((querySnapshot) => {
    //     const lists2 = [];

    //     querySnapshot.forEach((documentSnapshot) => {
    //       lists2.push({
    //         value: documentSnapshot.get("name"),
    //         key: documentSnapshot.id,
    //         len: documentSnapshot.get("elements").length.toString(),
    //       });
    //     });

    //     setLists((lists) => {
    //       return lists.concat(lists2);
    //     });
    //   });
    const subscriber = firestore()
      .collection("Lists")
      .where("creator", "==", route.params.userEmail)
      .onSnapshot((querySnapshot) => {
        const lists = [];

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            value: documentSnapshot.get("name"),
            key: documentSnapshot.id,
            len: documentSnapshot.get("elements").length.toString(),
            type: documentSnapshot.get("type"),
            multiValue: documentSnapshot.get("multiValue"),
          });
        });

        setLists(lists);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);

  handleItemClick = (item) => {
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

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.value}
        subtitle={item.len}
        key={item.key}
        //chevron={{color: 'blue'}}
        onPress={() => handleItemClick(item)}
        style={styles.listItem}
        bottomDivider
      />
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
        rightComponent={<Text style={styles.headerText}>Home</Text>}
      />
      <FlatList style={styles.list} data={lists} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
    borderColor: COLORS.second,
    borderWidth: 0.5,
  },
  floating: {},
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.second,
    marginTop: -15,
    marginRight: 10,
  },
});