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
    firestore()
      .collection("Lists")
      .add({
        elements: [],
        name: listname,
        pub: pub,
        type: getListType(),
        owner: route.params.user,
      })
      .then((result) => {
        console.log(result.type);
        if (chessSupport) {
          navigation.push("Chess", { listId: result.id });
        } else {
          navigation.push("EditList", {
            listName: result.id,
            multiValue: multiValue,
          });
        }
      });
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
