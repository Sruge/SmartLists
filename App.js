/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

import { Platform, StyleSheet, StatusBar, View, Text } from "react-native";

import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Baggy from "./src/screens/baggy.js";
import Login from "./src/screens/login.js";
import ExploreStack from "./src/screens/exploreStack.js";
import auth from "@react-native-firebase/auth";
import SignUp from "./src/screens/signUp.js";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\nCmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\nShake or press menu button for dev menu",
});

const firebaseCredentials = Platform.select({
  ios: "https://invertase.link/firebase-ios",
  android: "https://invertase.link/firebase-android",
});

export default App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.loginContainer}>
        <SignUp />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <BottomTab.Navigator initialRouteName="ExploreStack">
        <BottomTab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{ title: "Explore" }}
          initialParams={{ userEmail: user.email }}
        />
        <BottomTab.Screen
          name="Baggy"
          component={Baggy}
          options={{ title: "Baggy" }}
          initialParams={{ userEmail: user.email }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 20,
  },
  loginContainer: {
    flex: 1,
  },
});
