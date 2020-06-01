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
import addListElement from './addListElement';
import { Button } from 'react-native-elements';



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

    handleClick = (item) => {
      navigation.navigate("AddListElement", {listName: item.key, title: "Hans"})
    }

    renderItem = ({ item }) => {
      return (
        <Button title={item.value} onPress={() => handleClick(item)} buttonStyle={styles.listItem}/>
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
    marginHorizontal: 20,
    marginTop: 20,
  },
});