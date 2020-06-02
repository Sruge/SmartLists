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

import Explore from './explore.js';
import AddList from './addList.js';


const Stack = createStackNavigator();


export default ExploreStack = (props) => {
    return (
        <Stack.Navigator initialRouteName="Explore">
          <Stack.Screen name="AddList" component={AddList} options={{title: "Add List"}}/>
          <Stack.Screen name="Explore" component={Explore} options={{title: "Explore"}}/>
        </Stack.Navigator>
    );
  }

const styles = StyleSheet.create({
  
});
