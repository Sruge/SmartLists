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
import { Button, CheckBox } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";

export default AddList = (props) => {
  const [listname, setListname] = useState("");
  const [pub, setPub] = useState(true);
  const navigation = useNavigation();
  const input = React.createRef();

  handleOk = () => {
    if (listname !== "") {
      navigation.navigate("EditList", { listName: listname });
      //input.current.shake()
    }
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
        />
        <Button
          title="CREATE"
          onPress={handleOk}
          buttonStyle={styles.okButton}
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
  checkBox: {
    marginTop: 0,
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
