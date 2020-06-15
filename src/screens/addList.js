/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";

import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { Button, CheckBox, Text, getIconType } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";
import COLORS from "../res/colors.js";

export default AddList = (props) => {
  const [listname, setListname] = useState("");
  const [pub, setPub] = useState(true);
  const [chessSupport, setChessSupport] = useState(false);
  const navigation = useNavigation();
  const input = React.createRef();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [multiValue, setMultiValue] = useState(false);
  const route = useRoute();

  getListType = () => {
    if (multiValue) {
      return "multivalue";
    } else if (chessSupport) {
      return "chess";
    } else {
      return "simple";
    }
  };

  safeListToDb = () => {
    async function safeListToDbAsync() {
      //safe list in Collection "Lists"
      debugger;
      const ListRef = firestore().collection("Lists").doc();
      try {
        debugger;
        ListRef.set({
          elements: [],
          name: listname,
          pub: pub,
          type: getListType(),
          owner: route.params.user,
        });
      } catch (err) {
        console.error(err);
      }
      // add list reference to defaultCollection of user
      const uid = route.params.user;
      const defaultColRef = firestore().collection("Lists").doc(uid);
      const defaultCol = await defaultColRef.get();
      var data = defaultCol.data(); //change data locally
      data.elements.push({
        id: ListRef.id,
        key: ListRef.id,
        name: listname,
        type: getListType(),
      });
      const response = await defaultColRef.update(data); //update firestore with locally changed data

      //navigate to editListScreen
      if (chessSupport) {
        navigation.push("Chess", { listId: listname });
      } else {
        navigation.push("EditList", {
          listName: listname,
          multiValue: multiValue,
        });
      }
    }
    safeListToDbAsync();
  };

  handleOk = () => {
    if (listname !== "") {
      safeListToDb();
    }
  };

  handleCheckBoxPublicPress = () => {
    setPub(!pub);
  };

  handleCheckBoxMultiPress = () => {
    setMultiValue(!multiValue);
    setChessSupport(false);
  };
  handleCheckChessPress = () => {
    setChessSupport(!chessSupport);
    setMultiValue(false);
  };

  handleAdvancedClick = () => {
    setAdvancedOpen(!advancedOpen);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setListname(text)}
            defaultValue={listname}
            style={styles.textInput}
            placeholder={"Name of the List"}
            maxLength={40}
            onSubmitEditing={handleOk}
          />
        </View>
        <CheckBox
          center
          checked={pub}
          style={styles.checkBox}
          title={"Public"}
          onPress={handleCheckBoxPublicPress}
        />
        {advancedOpen && (
          <View>
            <Text style={styles.advancedButton}>Some more options</Text>
            <CheckBox
              center
              checked={multiValue}
              style={styles.checkBox}
              title={"Multivalue"}
              onPress={handleCheckBoxMultiPress}
            />
            <CheckBox
              center
              checked={chessSupport}
              style={styles.checkBox}
              title={"Chess Support"}
              onPress={handleCheckChessPress}
            />
          </View>
        )}
        <Button
          title="CREATE"
          onPress={handleOk}
          buttonStyle={styles.okButton}
        />
        <Text onPress={handleAdvancedClick} style={styles.advancedButton}>
          Advanced
        </Text>
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
    backgroundColor: COLORS.main,
    marginHorizontal: 10,
  },
  checkBox: {
    marginTop: 0,
  },
  textInput: {
    padding: 5,
  },
  advancedButton: {
    padding: 5,
    marginTop: 5,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    borderBottomColor: COLORS.main,
    borderBottomWidth: 0.3,
    marginHorizontal: 10,
    marginTop: 5,
    padding: 10,
  },
});
