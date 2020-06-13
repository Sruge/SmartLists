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

<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, Header, Overlay } from "react-native-elements";
=======
import React, {useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, Header } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../res/colors.js";
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../res/colors.js";
import LinearGradient from "react-native-linear-gradient";
import {} from "react-native-gesture-handler";
import ListViewOverlay from "./listViewOverlay.js";

export default ListView = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .doc(route.params.listId)
      .onSnapshot((documentSnapshot) => {
        const entries = [];
        if (documentSnapshot.get("elements") !== undefined) {
          Object.entries(documentSnapshot.get("elements")).forEach(
            ([key, val]) => {
              entries.push({
                value: val.value,
                description: val.description,
                key: key,
              });
            }
          );
        }
        setEntries(entries);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  handlePressEdit = () => {
    toggleOverlay();
  };

  toggleOverlay = () => {
    setVisible(!visible);
  };

  renderItem = ({ item }) => {
    if (route.params.type === "simple") {
      return (
        <ListItem
          title={item.value}
          key={item.key}
          //onPress={() => handleItemClick(item)}
          style={styles.listItem}
          bottomDivider
          //onLongPress={() => handleLongPress(item)}
        />
      );
    }

    return (
      <ListItem
        title={item.value}
        subtitle={item.description}
        key={item.key}
        //onPress={() => handleItemClick(item)}
        style={styles.listItem}
        bottomDivider
        //onLongPress={() => handleLongPress(item)}
      />
    );
  };

  handlePressEdit = () => {
    return
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay()}>
        <ListViewOverlay
          navigation={navigation}
          listId={route.params.listId}
          user={route.params.user}
        />
      </Overlay>
      <Header
        ViewComponent={LinearGradient} // Don't forget this!
        containerStyle={{ height: 60 }}
        linearGradientProps={{
          colors: [COLORS.main, "white"],
          start: { x: 0, y: 0.1 },
          end: { x: 1, y: 0.1 },
        }}
        centerComponent={
          <Text style={styles.headerText}>{route.params.name}</Text>
        }
        rightComponent={
          <TouchableOpacity onPress={handlePressEdit}>
            <Text>Edit</Text>
          </TouchableOpacity>
        }
=======
        <Header
          ViewComponent={LinearGradient} // Don't forget this!
          containerStyle={{ height: 60 }}
          linearGradientProps={{
            colors: [COLORS.step1, COLORS.step2],
            start: { x: 0, y: 0.1 },
            end: { x: 1, y: 0.1 },
          }}
          centerComponent={<Text style={styles.headerText}>List: {route.params.listName}</Text>}
          rightComponent={
            <View>
              <TouchableOpacity
                onPress={handlePressEdit}
                title="Edit List"
                style={styles.headerText}
              >
                <Text>Edit List</Text>
              </TouchableOpacity>
            </View>
          }
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
      />
      <FlatList style={styles.list} data={entries} renderItem={renderItem} />
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.second,
<<<<<<< HEAD
=======
    //marginTop: -15,
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
    marginRight: 10,
  },
});
