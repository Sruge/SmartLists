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
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { ListItem, Header, Overlay } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../res/colors.js";
import auth from "@react-native-firebase/auth";

const actions = [
  {
    text: "New List",
    name: "addList",
    position: 1,
    color: COLORS.main,
  },
  {
    text: "New Collection",
    name: "addCollection",
    position: 0,
    color: COLORS.main,
  },
];

export default Home = () => {
  const [lists, setLists] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .where("creator", "==", route.params.user)
      //.orderBy("type")
      .onSnapshot((querySnapshot) => {
        const lists = [];

        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            let len = 0;
            if (documentSnapshot.get("elements") !== null) {
              len = documentSnapshot.get("elements").length.toString();
            }
            lists.push({
              value: documentSnapshot.get("name"),
              key: documentSnapshot.id,
              len: len,
              type: documentSnapshot.get("type"),
              multiValue: documentSnapshot.get("multiValue"),
            });
          });

          setLists(lists);
        }
      });

    // Unsubscribe from events when no longer in use
    return () => [subscriber];
  }, []);

  handleItemClick = (item) => {
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

  handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  toggleOverlay = () => {
    setVisible(!visible);
  };

  handleAddClickHome = (item) => {
    if (item === "addList") {
      navigation.push("AddList", {
        userId: route.params.user,
      });
    } else if (item === "addCollection") toggleOverlay();
  };

  handleCreateCollection = () => {
    firestore()
      .collection("Lists")
      .add({
        name: collectionName,
        pub: false,
        creator: route.params.user,
        multiValue: route.params.multiValue,
        elements: [],
        type: "collection",
      })
      .then((some) => {
        console.log("Return from add List: ", some);
        const docRef = firestore().collection("Users").doc(route.params.user);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              console.log(
                "Updating Favs of an already existing user: ",
                route.params.user
              );
              firestore()
                .collection("Users")
                .doc(route.params.user)
                .update({
                  favLists: [collectionName],
                });
            } else {
              // doc.data() will be undefined in this case
              console.log("No such user, creating a new one!");
              firestore()
                .collection("Users")
                .add({
                  email: route.params.user,
                  favLists: [collectionName],
                });
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      });
    setCollectionName("");
    toggleOverlay();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay()}>
        <View>
          <TextInput
            onChangeText={(text) => setCollectionName(text)}
            defaultValue={collectionName}
            style={styles.textInput}
            placeholder={"Name of the Collection"}
            maxLength={40}
          />
          <Button
            title="CREATE"
            onPress={handleCreateCollection}
            buttonStyle={styles.okButton}
          />
        </View>
      </Overlay>
      <Header
        ViewComponent={LinearGradient} // Don't forget this!
        containerStyle={{ height: 60 }}
        linearGradientProps={{
          colors: [COLORS.main, "white"],
          start: { x: 0, y: 0.1 },
          end: { x: 1, y: 0.1 },
        }}
        centerComponent={<Text style={styles.headerText}>Home</Text>}
        rightComponent={
          <View>
            <TouchableOpacity
              onPress={handleLogout}
              title="Logout"
              style={styles.headerText}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <FlatList style={styles.list} data={lists} renderItem={renderItem} />
      <FloatingAction
        onPressItem={(item) => handleAddClickHome(item)}
        actions={actions}
        color={COLORS.main}
        overlayColor={"transparent"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 0,
    borderRadius: 100,
    //borderColor: COLORS.second,
    //borderWidth: 0.5,
  },
  floating: {},
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.second,
    marginRight: 10,
  },
  okButton: {
    backgroundColor: COLORS.main,
    marginTop: 20,
  },
});
