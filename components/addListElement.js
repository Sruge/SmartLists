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
  TextInput,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-elements';


export default AddListElement = (props) => {
    const [listItems, setListItems] = useState({});
    const [textKey, setTextKey] = useState('');
    const [textVal, setTextVal] = useState('');
    const [entries, setEntries] = useState();
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();
    let inputAvailable = true


    useEffect(() => {
        const listNames = firestore()
          .collection('Lists')
          .doc(route.params.listName)
          .onSnapshot(documentSnapshot => {
            console.log("Document Elements: ", documentSnapshot.get('elements'))

             const entries = [];
      
             Object.entries(documentSnapshot.get('elements')).forEach(([key, val]) => {
               console.log("Key: ", key, "Val: ", val)
                 entries.push({
                  value: val,
                  key: key,
                });
              });

              setEntries(entries)
              setLoading(false)
                         
        
            //   entries.push({
            //     value: entry.value,
            //     key: entry.key,
            //   });
            // });
      
            // setEntries(entries);
            // setLoading(false);
          });

      
        // Unsubscribe from events when no longer in use
        return () => listNames();
      }, []);

    handleAdd = () => {
        inputAvailable = false;
        setEntries(entries => { 
            entries = [...entries, {key: "something", value: textVal}]
            return entries});
        setTextVal('')
        inputAvailable = true
    }


  if (loading) {
      return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
          <TextInput editable={inputAvailable} onChangeText={textVal => setTextVal(textVal)} defaultValue={textVal} style={styles.textInput} placeholder="Value of the List Element"/>
          <Button title="ADD" onPress={handleAdd} buttonStyle={styles.okButton}/>
          <FlatList
            data={entries}
            renderItem={({ item }) => (
                <Text style = {styles.listEntry}>{item.value}</Text>
            )}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    textInput: {
        backgroundColor: "#d8d8e8",
        marginHorizontal: 20,
        marginTop: 10,
        alignContent: 'center',
        padding: 10,
    },
    okButton: {
        marginHorizontal: 20,
        marginTop: 10,
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