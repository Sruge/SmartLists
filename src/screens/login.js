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

import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
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
