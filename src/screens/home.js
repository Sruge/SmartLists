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
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";

export default Baggy = () => {
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
      .collection("ChessLists")
      .where("creator", "==", route.params.userEmail)
      .onSnapshot((querySnapshot) => {
        const lists = [];

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            value: documentSnapshot.get("name"),
            key: documentSnapshot.id,
            len: documentSnapshot.get("elements").length.toString(),
          });
        });

        setLists(lists);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);

  handleItemClick = (item) => {
    navigation.navigate("Chess", {
      listId: item.key,
    });
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
      <FlatList style={styles.list} data={lists} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  floating: {},
  container: {
    flex: 1,
  },
});
