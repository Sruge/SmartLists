import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default ExploreQuiz = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [lists, setLists] = useState([]); // Initial empty array of lists
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .where("pub", "==", true)
      .onSnapshot((querySnapshot) => {
        const lists = [];

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            value: documentSnapshot.get("name"),
            key: documentSnapshot.id,
            len: documentSnapshot.get("elements").length.toString(),
            multiValue: documentSnapshot.get("multiValue"),
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

  handleItemClickQuiz = (item) => {
    navigation.navigate("Quiz", {
      listId: item.key,
      multiValue: item.multiValue,
    });
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.value}
        subtitle={item.len}
        key={item.key}
        chevron={{ color: "black" }}
        onPress={() => handleItemClickQuiz(item)}
        style={styles.listItem}
        bottomDivider
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.list} data={lists} renderItem={renderItem} />
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
