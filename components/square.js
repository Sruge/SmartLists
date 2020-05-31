
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';


export default function Square(props) {
   return (
       <View>
        <Text style={styles.square}>Hello, {props.name}</Text>
        <Image
        width="200"
        height="200"
        source={{uri:'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'}}        />
        </View>
    )};



const styles = StyleSheet.create({
    square: {
        backgroundColor: 'red'
    }
})