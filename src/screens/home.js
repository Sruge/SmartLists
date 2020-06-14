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
import { Header, Overlay } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
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
    // load default Collectoin of user
    const colRef = firestore().collection("Lists").doc(route.params.user);
    const lists = [];
    async function loadData() {
      const listener = colRef.onSnapshot((doc) => {
        const renderData = doc.data().elements;
        const renderDataVal = Object.values(renderData);
        //debugger;
        setLists(renderDataVal);
      });
      return;
    }
    try {
      loadData();
    } catch (err) {
      console.log(error);
    }
    // Unsubscribe from events when no longer in use
    return;
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
        type: item.type,
        name: item.value,
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
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <Text style={styles.listItemSubtitle}>{item.type}</Text>
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
        var newPlace = Math.max(...Object.keys(defaultCol.data().elements)) + 1; //set place of new collection to be at the bottom
        newPlace = newPlace === -Infinity ? 1 : newPlace;
        var data = defaultCol.data(); //change data locally
        data.elements[newPlace] = {
          id: colRef.id,
          name: collectionName,
          type: "collection",
        };
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
          colors: [COLORS.main, COLORS.second],
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
