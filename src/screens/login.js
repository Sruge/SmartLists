/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, {useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default Login = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <ActivityIndicator />;
  }
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  floating: {},
  container: {
    flex: 1,
  },
});
