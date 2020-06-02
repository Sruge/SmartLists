/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


export default InsideList = (props) => {
    const route = useRoute();
    //let listItems = AsyncStorage.getItem(route.params.listName)
    //console.log("Inside List: ", listItems)
    //listItems = JSON.parse(listItems)

    const laender = {
        title: "Länder mit Hauptstadt",
        creator: "Gerus", 
        items: {
            Deutschland: "Berlin",
            Italien: "Rom",
        }
    }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          {Object.entries(laender.items).map(([key, v]) => { 
              return(
                <View key={key} style = {styles.listEntries}>
                    <Text style={styles.listEntry}>{key}</Text>
                    <Text style={styles.listEntry}>{v}</Text>
                </View>)}
            )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  listEntry: {
      fontSize: 15,
      flex: 1,
      padding: 5,
  },
  listEntries: {
    flexDirection: "row" ,
}
});