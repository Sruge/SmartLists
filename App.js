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
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExploreStack from "./src/screens/exploreStack.js";
import auth from "@react-native-firebase/auth";
import SignUp from "./src/screens/signUp.js";
import QuizStack from "./src/screens/quizStack.js";
import HomeStack from "./src/screens/homeStack.js";
import Icon from "react-native-vector-icons/AntDesign";

const BottomTab = createBottomTabNavigator();

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
      <BottomTab.Navigator initialRouteName="HomeStack">
        <BottomTab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{ title: "Explore", tabBarIcon: () => <Icon name="profile" color="#333" size={24} />,}}
          initialParams={{ userEmail: user.email }}
        />
        <BottomTab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "Home", tabBarIcon: () => <Icon name="profile" color="#333" size={24} />,}}
          initialParams={{ userEmail: user.email }}
          
        />
        <BottomTab.Screen
          name="QuizStack"
          component={QuizStack}
          options={{ title: "Quiz", tabBarIcon: () => <Icon name="profile" color="#333" size={24} /> }}
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
