/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import firestore from '@react-native-firebase/database';

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useRoute, useNavigation } from '@react-navigation/native';


export default AddList = (props) => {
    const route = useRoute();
    const [listname, setListname] = useState('');
    const navigation = useNavigation();

    handleOk = () => {
        navigation.navigate("AddListElement", {listName: listname});
    }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <TextInput onChangeText={text => setListname(text)} defaultValue={listname} style={styles.textInput} placeholder="Name of the List"/>
          <TouchableOpacity title="Ok" onPress={handleOk} style={styles.okButton}>
              <Text style={styles.buttonTitle}>CREATE</Text> 
          </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  listEntry: {
      fontSize: 30,
      flex: 1
  },
  listEntries: {
    flexDirection: "row" ,
}
});