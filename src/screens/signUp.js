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
  const [message, setMessage] = useState("");

  async function handleSignUp() {
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(
        email,
        pw
      );
      //to-do: do not let user sign-up if user-profile in firestore cannot be created
      const userId = await auth().currentUser.uid;
      const responseUser = await firestore()
        .collection("Users")
        .doc(userId)
        .set({
          uid: userId,
          email: email,
          username: userName,
          favLists: [],
        });
      const colName = "defaultCollection" + userName;
      const responseCollection = await firestore()
        .collection("Lists")
        .doc(userId)
        .set({
          elements: [],
          name: colName,
          type: "collection",
        });
    } catch (err) {
      console.error(err);
      setMessage(err);
    }
    /*
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
       });
       */
  }

  handleLogIn = () => {
    console.log("Start Logging in");
    auth()
      .signInWithEmailAndPassword(email, pw)

      .catch((error) => {
        console.log("Error in Sign Up");
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
            title="Sign up"
            onPress={handleSignUp}
            buttonStyle={styles.okButton}
          />
          <Button
            title="Log in"
            onPress={handleLogIn}
            buttonStyle={styles.okButton}
          />
          <Text defaultValue={message} />
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
