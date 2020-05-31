/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { max } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';


export default AddListElement = (props) => {
    const [listItems, setListItems] = useState({});
    const [textKey, setTextKey] = useState('');
    const [textVal, setTextVal] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    let inputAvailable = true

    handleOk = () => {
        inputAvailable = false;
        setListItems(list => { 
            list[textKey.toString()] = textVal
            return list});
        setTextKey('')
        setTextVal('')
        inputAvailable = true
    }

    storeData = async () => {
        try {
            await AsyncStorage.setItem(route.params.listName, JSON.stringify(listItems))
            console.log("Setting listNames to: ", route.params.listName)
            await AsyncStorage.setItem('listNames', JSON.stringify([route.params.listName]))
        } catch (e) {
            console.log(e)
        }
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
          <ScrollView style={styles.listView}>
            {Object.entries(listItems).map(([key, v]) => { 
              return(
                <View key={key} style = {styles.listEntries}>
                    <Text style={styles.listEntry}>{key}</Text>
                    <Text style={styles.listEntry}>{v}</Text>
                </View>)}
            )}
          </ScrollView>
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
    listEntries: {
          flexDirection: 'row',
        },
    listEntry: {
        fontSize: 15,
        flex: 1,
        marginHorizontal: 10,
    },
});