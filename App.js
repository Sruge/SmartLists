/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';

import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer, useNavigation, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Overview from './components/overview.js';
import InsideList from './components/insideList.js';
import AddList from './components/addList.js';
import AddListElement from './components/addListElement.js';

import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const Stack = createStackNavigator();

database()
  .ref('/users/123')
  .set({
    name: 'Ada Lovelace',
    age: 31,
  })
  //.then(() => console.log('Data set.'));

database()
  .ref('/users/123')
  .once('value')
  .then(snapshot => {
    //console.log('User data: ', snapshot.val());
  });

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const firebaseCredentials = Platform.select({
  ios: 'https://invertase.link/firebase-ios',
  android: 'https://invertase.link/firebase-android',
});

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="AddListElement">
          <Stack.Screen name="AddList" component={AddList} options={{title: "Add List"}}/>
          <Stack.Screen name="Overview" component={Overview} options={{title: "List Overview", headerRight: () => (
              <TouchableOpacity style={styles.headerButton}
                onPress={() => console.log("ADD pressed")}>
                <Text>
                    ADD
                </Text>
              </TouchableOpacity>)}}/>
          <Stack.Screen name="InsideList" component={InsideList} options={{title: "Inside List"}}/>
          <Stack.Screen name="AddListElement" component={AddListElement} options={{title: "Add List Element", headerRight: () => (
              <TouchableOpacity style={styles.headerButton}
              onPress={() => console.log("Save pressed")}>
                <Text>
                    Save
                </Text>
            </TouchableOpacity>)}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
