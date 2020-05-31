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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import database from '@react-native-firebase/database';
import { max } from 'react-native-reanimated';





export default Overview = (props) => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [lists, setLists] = useState([]); // Initial empty array of users

    useEffect(() => {
        const listNames = firestore()
          .collection('Lists')
          .onSnapshot(querySnapshot => {
            console.log("Query: ", querySnapshot)

            const lists = [];
      
            querySnapshot.forEach(documentSnapshot => {
                console.log("Document: ", documentSnapshot.get('name'))

              lists.push({
                value: documentSnapshot.get('name'),
                key: documentSnapshot.id,
              });
              console.log("Data: ", documentSnapshot.get('elements'))
              console.log(lists)
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

    handleClick = (item) => {
        console.log(item)
    }

    return (
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={(item) => handleClick(item)} style={styles.listItem}>
              <Text>List ID: {item.key}</Text>
              <Text>List Name: {item.value}</Text>
            </TouchableOpacity>
          )}
        />
      );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'yellow',
    height: 50,
    width: 300,
    flex: 1,
    margin: 10,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});