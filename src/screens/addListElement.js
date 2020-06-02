/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Button, Input } from 'react-native-elements';


export default AddListElement = (props) => {
    const [textVal, setTextVal] = useState('');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        const subscriber = firestore()
          .collection('Lists')
          .doc(route.params.listId)
          .onSnapshot(documentSnapshot => {

            const entries = [];
            if (documentSnapshot.get('elements') !== undefined) {
              Object.entries(documentSnapshot.get('elements')).forEach(([key, val]) => {
                  entries.push({
                    value: val,
                    key: key,
                  });
                });
              }
              setEntries(entries)
              setLoading(false)
          });

      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);

    handleAdd = () => {
        setEntries(entries => { 
            entries.push({key: entries.length.toString(), value: textVal})
            return entries});
        setTextVal('')
        
    }

    handleSaveClick = () => {
      const resultList = []
      entries.forEach(entry => {
        resultList.push(entry.value)
      })
      if(route.params.listId) {
        firestore().collection('Lists').doc(route.params.listId).update({
          elements: resultList
        })
      } else {
        firestore().collection('Lists').add({
          name: route.params.listName,
          elements: resultList
        })
      }
      navigation.navigate("Overview")
    }


  if (loading) {
      return <ActivityIndicator />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
          <Input editable={inputAvailable} onChangeText={textVal => setTextVal(textVal)} defaultValue={textVal} placeholder="New List Element"/>
          <Button title="ADD" onPress={handleAdd} buttonStyle={styles.okButton}/>
          <FlatList
            data={entries}
            renderItem={({ item }) => (
                <Text style = {styles.listEntry}>{item.value}</Text>
            )}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5
    },
    okButton: {
        marginHorizontal: 20,
    },
    listView: {
        marginHorizontal: 20,
        marginVertical: 10,
        flex: 1
    },
    listEntry: {
        fontSize: 20,
            marginTop: 10,
        textAlign: 'center'
    },
});