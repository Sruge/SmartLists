import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from "react-native-safe-area-context";

const actions = [
  {
    text: "New List",
    name: "bt_accessibility",
    position: 0,
    color: "#f4511e",
  },
];

export default Explore = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [lists, setLists] = useState([]); // Initial empty array of users
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .onSnapshot((querySnapshot) => {
        const lists = [];

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            value: documentSnapshot.get("name"),
            key: documentSnapshot.id,
            len: documentSnapshot.get("elements").length.toString(),
          });
        });

        setLists(lists);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  handleItemClick = (item) => {
    navigation.navigate("ListView", { listId: item.key });
  };

  handleAddClick = (item) => {
    navigation.navigate("AddList");
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.value}
        subtitle={item.len}
        key={item.key}
        //chevron={{color: 'blue'}}
        onPress={() => handleItemClick(item)}
        style={styles.listItem}
        bottomDivider
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.list} data={lists} renderItem={renderItem} />
      <FloatingAction
        onPressItem={(item) => handleAddClick(item)}
        actions={actions}
        color={"#f4511e"}
        overlayColor={"transparent"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  container: {
    flex: 1,
  },
});
