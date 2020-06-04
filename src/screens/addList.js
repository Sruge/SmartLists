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
import { Button, CheckBox, Text } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";

export default AddList = (props) => {
  const [listname, setListname] = useState("");
  const [pub, setPub] = useState(true);
  const [chessSupport, setChessSupport] = useState(false);
  const navigation = useNavigation();
  const input = React.createRef();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [multiValue, setMultiValue] = useState(false);
  const route = useRoute();

  handleOk = () => {
    if (chessSupport) {
      navigation.navigate("Chess", {
        listName: listname,
        pub: pub,
        userEmail: route.params.userEmail,
        multiValue: multiValue,
        chessSupport: chessSupport,
      });
    } else if (listname !== "") {
      navigation.navigate("EditList", {
        listName: listname,
        pub: pub,
        userEmail: route.params.userEmail,
        multiValue: multiValue,
        chessSupport: chessSupport,
      });
      //input.current.shake()
    }
  };

  handleCheckBoxPublicPress = () => {
    setPub(!pub);
  };

  handleCheckBoxMultiPress = () => {
    setMultiValue(!multiValue);
  };
  handleCheckChessPress = () => {
    setChessSupport(!chessSupport);
  };

  handleAdvancedClick = () => {
    setAdvancedOpen(!advancedOpen);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input}
            label={"handsons"}
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
    backgroundColor: "#f4511e",
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
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 0.3,
    marginHorizontal: 10,
    marginTop: 5,
    padding: 10,
  },
});
