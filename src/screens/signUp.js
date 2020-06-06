/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import "@react-native-firebase/app";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TextInput,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { Button } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";

export default SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();
  const [userName, setUserName] = useState();

  handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, pw)
      .then((user) => {
        const docRef = firestore().collection("Users").doc(user.user.uid);

        // docRef
        //   .get()
        //   .then(function (doc) {
        //     if (doc.exists) {
        //       console.log("User already exists, we shouldnt be here ", route.params.listName);
        //     } else {
        //       // doc.data() will be undefined in this case
        //       console.log("No such document, creating a new one!");
        //       firestore().collection("Users").add({
        //         username: userName,
        //         email: user,
        //       });
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log("Error getting document:", error);
        //   });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Hello Friend of Lists</Text>
        <View style={styles.form}>
          <Text>Username</Text>
          <TextInput
            onChangeText={(text) => setUserName(text)}
            defaultValue={userName}
            style={styles.textInput}
            placeholder={"Type in your User Name"}
            maxLength={40}
          />
          <Text>Email</Text>

          <TextInput
            onChangeText={(text) => setEmail(text)}
            defaultValue={email}
            style={styles.textInput}
            placeholder={"Type in your Email"}
            keyboardType="email-address"
            maxLength={40}
          />
          <Text>Password</Text>

          <TextInput
            onChangeText={(text) => setPw(text)}
            defaultValue={pw}
            secureTextEntry={true}
            style={styles.textInput}
            placeholder={"Choose a Password"}
            maxLength={40}
          />
          <Button
            title="OK"
            onPress={handleSignUp}
            buttonStyle={styles.okButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
  },
  textInput: {
    padding: 10,
    fontSize: 20,
    marginEnd: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    flex: 1,
    textAlignVertical: "center",
  },
  form: {
    flex: 3,
  },
  okButton: {
    backgroundColor: "#f4511e",
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginHorizontal: 10,
    marginTop: 5,
    padding: 20,
    flex: 1,
  },
});
