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
import { useRoute, useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { Button } from "react-native-elements";

export default EditList = (props) => {
  const [textVal, setTextVal] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const input = React.createRef();

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
                value: val,
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
    setEntries((entries) => {
      entries.push({ key: entries.length.toString(), value: textVal });
      return entries;
    });
    setTextVal("");
  };

  handleSaveClick = () => {
    const resultList = [];
    entries.forEach((entry) => {
      resultList.push(entry.value);
    });
    if (route.params.listId) {
      firestore().collection("Lists").doc(route.params.listId).update({
        elements: resultList,
      });
    } else {
      firestore().collection("Lists").add({
        name: route.params.listName,
        elements: resultList,
      });
    }
    navigation.navigate("Overview");
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input}
            label={"handsons"}
            onChangeText={(text) => setTextVal(text)}
            defaultValue={textVal}
            style={styles.textInput}
            placeholder={"Name of the List"}
            maxLength={40}
          />
        </View>
        <Button title="ADD" onPress={handleAdd} buttonStyle={styles.okButton} />
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <Text style={styles.listEntry}>{item.value}</Text>
          )}
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
  listView: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
  },
  listEntry: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  textInput: {
    padding: 0,
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
