import "react-native-gesture-handler";
import React from "react";

import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { useRoute, useNavigation } from "@react-navigation/native";

import Home from "./home.js";
import ListView from "./listView.js";
import AddList from "./addList.js";
import EditList from "./editList.js";
import Chess from "./chess.js";

const Stack = createStackNavigator();

export default HomeStack = (props) => {
  const route = useRoute();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          //f4511e
          backgroundColor: "#121288",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home" }}
        initialParams={{ user: route.params.user }}
      />
      <Stack.Screen
        name="ListView"
        component={ListView}
        options={{ title: "List View" }}
        initialParams={{ user: route.params.user }}
      />
      <Stack.Screen
        name="AddList"
        component={AddList}
        options={{ title: "Create a new list" }}
        initialParams={{ user: route.params.user }}
      />
      <Stack.Screen
        name="EditList"
        component={EditList}
        options={{ title: "Edit mode" }}
        initialParams={{ user: route.params.user }}
      />
      <Stack.Screen
        name="Chess"
        component={Chess}
        options={{ title: "Chess Mode" }}
        initialParams={{ user: route.params.user }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
