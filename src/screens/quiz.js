/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  View,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { Button } from "react-native-elements";

import Icon from "react-native-vector-icons/AntDesign";
import COLORS from "../res/colors";

export default Quiz = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState();
  const [currentEntry, setCurrentEntry] = useState();
  const route = useRoute();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [inQuestion, setInQuestion] = useState("description");

  console.log(currentEntry);
  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .doc(route.params.listId)
      .onSnapshot((documentSnapshot) => {
        const entries = [];
        if (documentSnapshot.get("elements") !== undefined) {
          Object.entries(documentSnapshot.get("elements")).forEach(
            ([key, val]) => {
              entries.push({
                value: val.value,
                description: val.description,
                key: key,
              });
            }
          );
        }
        setEntries(entries);
        console.log(route.params.multivalue);
        setInQuestion(() => {
          return route.params.multiValue ? "description" : "key";
        });
        setCurrentEntry(entries[Math.floor(Math.random() * entries.length)]);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  handleCheck = () => {
    if (answer === currentEntry[inQuestion]) {
      setScore((score) => {
        return (score += 1);
      });
      setTotal((total) => {
        return (total += 1);
      });
    } else {
      setTotal((total) => {
        return (total += 1);
      });
    }
    setCurrentEntry(entries[Math.floor(Math.random() * entries.length)]);
    setAnswer("");
  };

  switchInQuestion = () => {
    setInQuestion((inQuestion) => {
      if (inQuestion === "value") {
        if (route.params.multiValue) {
          setInQuestion("description");
        } else {
          setInQuestion("key");
        }
      } else {
        setInQuestion("value");
      }
    });
  };

  renderQuestion = () => {
    if (inQuestion === "description" || inQuestion === "key") {
      return <Text style={styles.title}>{currentEntry.value}</Text>;
    } else {
      if (route.params.multiValue) {
        return <Text style={styles.title}>{currentEntry.description}</Text>;
      } else {
        return <Text style={styles.title}>{currentEntry.key}</Text>;
      }
    }
  };

  if (loading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="smile-circle" onPress={switchInQuestion} />
        {renderQuestion()}
        <Text style={styles.score}>
          {score} / {total}
        </Text>
        <View style={styles.form}>
          <TextInput
            onChangeText={(text) => setAnswer(text)}
            defaultValue={answer}
            style={styles.textInput}
            placeholder={"Answer"}
            //keyboardType="numeric"
            maxLength={100}
          />

          <Button
            title="OK"
            onPress={handleCheck}
            buttonStyle={styles.okButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
  },
  textInput: {
    padding: 10,
    fontSize: 20,
    marginEnd: 10,
    alignContent: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    flex: 1,
    textAlignVertical: "center",
  },
  form: {
    flex: 3,
  },
  score: {
    fontSize: 15,
    textAlign: "center",
    flex: 1,
    textAlignVertical: "center",
  },
  okButton: {
    backgroundColor: COLORS.main,
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 5,
    padding: 20,
    flex: 1,
  },
});
