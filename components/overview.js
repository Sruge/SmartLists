/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';



export default Overview = (props) => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [lists, setLists] = useState([]); // Initial empty array of users
    const navigation = useNavigation();

    useEffect(() => {
        const listNames = firestore()
          .collection('Lists')
          .onSnapshot(querySnapshot => {

            const lists = [];
      
            querySnapshot.forEach(documentSnapshot => {

              lists.push({
                value: documentSnapshot.get('name'),
                key: documentSnapshot.id,
                len: documentSnapshot.get('elements').length.toString()
              });
            });
      
            setLists(lists);
            setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => listNames();
      }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    handleItemClick = (item) => {
      navigation.navigate("AddListElement", {listId: item.key})
    }

    handleAddClick = () => {
      navigation.navigate("AddList")

    }

    renderItem = ({ item }) => {
      console.log("render item: ", item)
      return (
        <ListItem 
          title={item.value}
          subtitle={item.len}
          key={item.key} 
          //chevron={{color: 'blue'}}
          onPress={() => handleItemClick(item)} 
          style={styles.listItem}
          bottomDivider/>
      )
    }

    return (
        <FlatList
          data={lists}
          renderItem={renderItem}
        />
      );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5
  },
});