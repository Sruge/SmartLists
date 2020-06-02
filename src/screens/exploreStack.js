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
import ListView from './listView.js';


const Stack = createStackNavigator();


export default ExploreStack = (props) => {
    return (
        <Stack.Navigator initialRouteName="Explore"
            screenOptions={{
                headerShown: false
            }}>
          <Stack.Screen name="Explore" component={Explore} options={{title: "Explore"}}/>
          <Stack.Screen name="ListView" component={ListView} options={{title: "List View"}}/>
        </Stack.Navigator>
    );
  }

const styles = StyleSheet.create({
  
});
