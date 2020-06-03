/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useRoute, useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { Button, ListItem } from "react-native-elements";

const actions = [
  {
    text: "Save",
    name: "bt_save",
    position: 0,
    color: "#f4511e",
  },
];

export default EditList = (props) => {
  const [textVal, setTextVal] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .doc(route.params.listName)
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

  handleAdd = () => {
    if (textVal !== "") {
      setEntries((entries) => {
        entries.push({
          key: entries.length.toString(),
          value: textVal,
          description: description,
        });
        return entries;
      });
      setTextVal("");
      setDescription("");
    }
  };

  handleSaveClick = () => {
    const resultList = [];
    entries.forEach((entry) => {
      resultList.push(entry);
    });
    console.log(route.params.listName);
    const docRef = firestore().collection("Lists").doc(route.params.listName);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Updating already existing doc ", route.params.listName);
          firestore().collection("Lists").doc(route.params.listName).update({
            elements: resultList,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document, creating a new one!");
          firestore().collection("Lists").add({
            name: route.params.listName,
            elements: entries,
            pub: route.params.pub,
            creator: route.params.userEmail,
            multiValue: route.params.multiValue,
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    navigation.navigate("Explore");
  };

  renderItem = ({ item }) => {
    if (!route.params.multiValue) {
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

  renderInput = (item) => {
    if (!route.params.multiValue) {
      return (
        <TextInput
          onChangeText={(text) => setTextVal(text)}
          defaultValue={textVal}
          style={styles.textInput}
          placeholder={"Value"}
          maxLength={40}
        />
      );
    }

    return (
      <View>
        <TextInput
          onChangeText={(text) => setTextVal(text)}
          defaultValue={textVal}
          style={styles.textInput}
          placeholder={"Value"}
          maxLength={40}
        />
        <TextInput
          onChangeText={(text) => setDescription(text)}
          defaultValue={description}
          style={styles.textInput}
          placeholder={"Description"}
          maxLength={40}
        />
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>{renderInput()}</View>
        <Button title="ADD" onPress={handleAdd} buttonStyle={styles.okButton} />
        <FlatList data={entries} renderItem={renderItem} />
        <FloatingAction
          onPressItem={(item) => handleSaveClick(item)}
          actions={actions}
          color={"#f4511e"}
          overlayColor={"transparent"}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
  okButton: {
    backgroundColor: "#f4511e",
    marginHorizontal: 10,
  },
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  textInput: {
    padding: 5,
  },
  inputContainer: {
    backgroundColor: "white",
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 0.3,
    marginHorizontal: 10,
    marginTop: 5,
    padding: 10,
  },
});
