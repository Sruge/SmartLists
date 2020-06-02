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

export default ListView = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .doc(route.params.listId)
      .onSnapshot((documentSnapshot) => {
        const entries = [];
        if (documentSnapshot.get("elements") !== undefined) {
          Object.entries(documentSnapshot.get("elements")).forEach(
            ([key, val]) => {
              entries.push({
                value: val,
                key: key,
              });
            }
          );
        }
        setEntries(entries);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.value}
        key={item.key}
        //chevron={{color: 'blue'}}
        //onPress={() => handleItemClick(item)}
        style={styles.listItem}
        bottomDivider
      />
    );
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.list} data={entries} renderItem={renderItem} />
    </SafeAreaView>
  );
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
