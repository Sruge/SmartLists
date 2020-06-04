import "react-native-gesture-handler";
import React from "react";

import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { useRoute, useNavigation } from "@react-navigation/native";

import ExploreQuiz from "./exploreQuiz.js";
import Quiz from "./quiz.js";
const Stack = createStackNavigator();

export default QuizStack = (props) => {
  const route = useRoute();
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ExploreQuiz"
        component={ExploreQuiz}
        options={{ title: "Choose a list to play" }}
        initialParams={{ userEmail: route.params.userEmail }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ title: "Quiz" }}
        initialParams={{ userEmail: route.params.userEmail }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
