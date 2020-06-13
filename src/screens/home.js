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
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
import { Header, Overlay } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
=======
import { ListItem, Header } from "react-native-elements";
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../res/colors.js";
import auth from "@react-native-firebase/auth";
import DraggableFlatList from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";

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
<<<<<<< HEAD
    const subscriber = firestore().collection("Lists").doc(route.params.userId);

    // to do: change following code to work with defaultUserCollection
    /*
=======
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
    console.log(route.params.userEmail);
    const subscriber = firestore()
      .collection("Lists")
      .where("creator", "==", route.params.userEmail)
>>>>>>> 025484f6dc8a3f241aa2a726c5c7d088dab5e064
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
              type: documentSnapshot.get("type"),
              multiValue: documentSnapshot.get("multiValue"),
            });
          });

          setLists(lists);
        }
      });
      */

    // Unsubscribe from events when no longer in use
    return () => [subscriber];
  }, []);

  handleItemClick = (item) => {
    if (item.type === "chess") {
      navigation.push("Chess", {
        listId: item.key,
        listName: item.value,
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
        onLongPress={drag}
        onPress={() => handleItemClick(item)}
      >
        <View>
          <Text style={styles.listItemTitle}>{item.value}</Text>
          <Text style={styles.listItemSubtitle}>{item.len}</Text>
        </View>
      </TouchableOpacity>
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
    // create collection in firestore
    async function createCollection() {
      try {
        const colRef = await firestore().collection("Lists").doc();
        colRef.set({
          name: collectionName,
          pub: false,
          creator: route.params.user,
          owner: [route.params.user],
          multiValue: true,
          elements: [],
          type: "collection",
        });
        console.log("colRef: ", colRef);
        console.log("colRef.id: ", colRef.id);

        // 1 add new collection to defaultCollection of user
        // 2 add collection to favorites of user

        // 1
        const defaultColRef = await firestore() //create reference
          .collection("Lists")
          .doc(route.params.user);
        const defaultCol = await defaultColRef.get(); //get data
        const newPlace =
          Math.max(...Object.keys(defaultCol.data().elements)) + 1; //set place of new collection to be at the bottom
        var data = defaultCol.data(); //change data locally
        data.elements[newPlace] = colRef.id;
        const response = await defaultColRef.update(data); //update firestore with locally changed data

        // 2
        const userDoc = firestore().collection("Users").doc(route.params.user);
        const doc = await userDoc.get();
        data = doc.data();
        data["favLists"] = [...data.favLists, colRef.id];
        await userDoc.update(data);

        debugger;
      } catch (err) {
        console.log("ERROR in executing second part of creating Collectoin");
        console.err(err);
      }
    }
    createCollection();
    setCollectionName(""); //reset overlay
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
          colors: [COLORS.main, COLORS.step1],
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
      <DraggableFlatList
        style={styles.lists}
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={(lists) => {
          setLists(lists.data);
        }}
      />
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
  listItemTitle: {
    fontSize: 16,
  },
  listItemSubtitle: {
    fontSize: 13,
  },
});
