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

import Home from "./src/screens/home.js";
import Login from "./src/screens/login.js";
import ExploreStack from "./src/screens/exploreStack.js";
import auth from "@react-native-firebase/auth";
import SignUp from "./src/screens/signUp.js";
import Chess from "./src/screens/chess.js";
import QuizStack from "./src/screens/quizStack.js";
import HomeStack from "./src/screens/homeStack.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



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
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <BottomTab.Navigator initialRouteName="HomeStack">
        <BottomTab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{ title: "Explore", tabBarIcon: () => <Icon name="profile" color="#333" size={24} />,}}
          initialParams={{ user: user.uid }}
        />
        <BottomTab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "Home", tabBarIcon: () => <Icon name="profile" color="#333" size={24} />,}}
          initialParams={{ user: user.uid }}
          
        />
        <BottomTab.Screen
          name="QuizStack"
          component={QuizStack}
          options={{ title: "Quiz", tabBarIcon: () => <Icon name="profile" color="#333" size={24} /> }}
          initialParams={{ user: user.uid }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
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
