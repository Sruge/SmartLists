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
  StyleSheet,
  StatusBar,
} from 'react-native';

import { NavigationContainer, useNavigation, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Explore from './src/screens/explore.js';
import Baggy from './src/screens/baggy.js';
import AddList from './src/screens/addList.js';
import AddListElement from './src/screens/addListElement.js';
import ExploreStack from './src/screens/exploreStack.js';
import { Button } from 'react-native-elements';


const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

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
        <BottomTab.Navigator initialRouteName="ExploreStack">
          <BottomTab.Screen name="ExploreStack" component={ExploreStack} options={{title: "Explore"}}/>
          <BottomTab.Screen name="Baggy" component={Baggy} options={{title: "Baggy"}}/>
        </BottomTab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 20,
   }
});
