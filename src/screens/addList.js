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
} from 'react-native';
import { Button, Input } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';


export default AddList = (props) => {
    const route = useRoute();
    const [listname, setListname] = useState('');
    const navigation = useNavigation();

    handleOk = () => {
      if (listname !== "") {
        navigation.navigate("AddListElement", {listName: listname});
      }
    }

  return (
    <>
      <SafeAreaView style={styles.container}>
          <Input onChangeText={text => setListname(text)} defaultValue={listname} style={styles.textInput} placeholder="Name of the List"/>
          <Button title="CREATE" onPress={handleOk} buttonStyle={styles.okButton}/>
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
});