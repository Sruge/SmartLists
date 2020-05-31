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
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


export default AddListElement = (props) => {
    const [listItems, setListItems] = useState({});
    const [textKey, setTextKey] = useState('');
    const [textVal, setTextVal] = useState('');
    const [lists, setLists] = useState();
    const [loading, setLoading] = useState();
    const route = useRoute();
    const navigation = useNavigation();
    let inputAvailable = true


    useEffect(() => {
        const listNames = firestore()
          .collection('Lists')
          .doc(props.listName)
          .onSnapshot(documentSnapshot => {
            console.log("ListName: ", route.params)

            // const lists = [];
      
            // querySnapshot.forEach(documentSnapshot => {
            //     console.log("Document: ", documentSnapshot.get('name'))

            //   lists.push({
            //     value: documentSnapshot.get('name'),
            //     key: documentSnapshot.id,
            //   });
            //   console.log("Data: ", documentSnapshot.get('elements'))
            //   console.log(lists)
            // });
      
            // setLists(lists);
            // setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => listNames();
      }, []);

    handleOk = () => {
        inputAvailable = false;
        setListItems(list => { 
            list[textKey.toString()] = textVal
            return list});
        setTextKey('')
        setTextVal('')
        inputAvailable = true
    }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
          <TextInput editable={inputAvailable} onChangeText={textKey => setTextKey(textKey)} defaultValue={textKey} style={styles.textInput} placeholder="Key of the List Element"/>
          <TextInput editable={inputAvailable} onChangeText={textVal => setTextVal(textVal)} defaultValue={textVal} style={styles.textInput} placeholder="Value of the List Element"/>
          <TouchableOpacity title="Ok" onPress={handleOk} style={styles.okButton}>
              <Text style={styles.buttonTitle}>ADD</Text> 
          </TouchableOpacity>
          <FlatList
            data={lists}
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
    buttonTitle: {
        fontSize: 18,
    },
    okButton: {
        backgroundColor: '#007788',
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
        alignItems: 'center'
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