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
import { StyleSheet, Text } from "react-native";

import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chessboard from 'chessboardjsx';

export default Baggy = () => {
  const [lists, setLists] = useState();
  const route = useRoute();
  useEffect(() => {
    console.log(route.params.userEmail);
    const subscriber = firestore()
      .collection("Lists")
      .where("type", "==", "chess")
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>Chess</Text>
      <Chessboard/>
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
