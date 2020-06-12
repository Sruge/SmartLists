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
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { Button, Header } from "react-native-elements";
import { Image, ListItem, Icon } from "react-native-elements";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import WhitePawn from "./chessPieces/whitePawn.js";
import WhiteKing from "./chessPieces/whiteKing.js";
import WhiteQueen from "./chessPieces/whiteQueen.js";
import WhiteBishop from "./chessPieces/whiteBishop.js";
import WhiteKnight from "./chessPieces/whiteKnight.js";
import WhiteRook from "./chessPieces/whiteRook.js";
import BlackKing from "./chessPieces/blackKing.js";
import BlackPawn from "./chessPieces/blackPawn.js";
import BlackQueen from "./chessPieces/blackQueen.js";
import BlackBishop from "./chessPieces/blackBishop.js";
import BlackKnight from "./chessPieces/blackKnight.js";
import BlackRook from "./chessPieces/blackRook.js";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../res/colors.js";
import LinearGradient from "react-native-linear-gradient";

export default Chess = () => {
  const route = useRoute();
  const [description, setDescription] = useState();
  const navigation = useNavigation();
  const [currentSquare, setCurrentSquare] = useState({ row: 9, column: 9 });
  const [position, setPosition] = useState("");
  const [path, setPath] = useState("");
  const [currentEntry, setCurrentEntry] = useState(0);
  const [entries, setEntries] = useState([]);
  const [currentContent, setCurrentContent] = useState(0);
  const [listName, setListName] = useState("");

  useEffect(() => {
    if (entries.length === 0) {
      console.log("setInititalState");
      setPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    } else {
      console.log(
        "update state, description: ",
        description,
        entries[currentEntry].description
      );
      setPath(entries[currentEntry].path);
      setPosition(entries[currentEntry].value);
      setDescription(entries[currentEntry].description);
    }
  }, [currentEntry]);

  useEffect(() => {
    if (!(entries.length === 0)) {
      setDescription("");
      entries.forEach((entry) => {
        if (entry.value === position) {
          console.log("setting description: ", entry.description);
          setDescription(entry.description);
          return;
        }
      });
    }
  }, [position]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("Lists")
      .doc(route.params.listId)
      .onSnapshot((documentSnapshot) => {
        const entries2 = [];
        if (documentSnapshot.get("name") !== undefined) {
          setListName(documentSnapshot.get("name"));
        }
        if (documentSnapshot.get("elements") !== undefined) {
          Object.entries(documentSnapshot.get("elements")).forEach(
            ([key, val]) => {
              entries2.push({
                value: val.value,
                description: val.description,
                key: key,
                path: val.path,
              });
            }
          );
        }
        if (entries2.length > 0) {
          //setCurrentEntry(entries.length - 1)
          console.log("setting entries to: ", entries2);
          setEntries(entries2);
          setPath(entries2[currentEntry].path);
          setPosition(entries2[currentEntry].value);
          setDescription(entries2[currentEntry].description);
        }
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  String.prototype.replaceAt = function (index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  };

  goBack = () => {
    setPosition(entries[currentEntry].value);
  };

  makeMove = (content, firstSquare, secondSquare) => {
    const letters = "ABCDEFGH";
    const numbers = "87654321";
    let moveCount = "";
    setPath((path) => {
      if (path.length % 11 === 0) {
        moveCount = (Math.floor(path.length / 11) + 1).toString() + ". ";
      }
      return (
        path.toString() +
        " " +
        moveCount +
        currentContent.toString() +
        letters[secondSquare.column] +
        numbers[secondSquare.row]
      );
    });

    console.log(firstSquare.row, secondSquare.column);
    setPosition((pos) => {
      pos = pos.replace(/8/g, "00000000");
      pos = pos.replace(/7/g, "0000000");
      pos = pos.replace(/6/g, "000000");
      pos = pos.replace(/5/g, "00000");
      pos = pos.replace(/4/g, "0000");
      pos = pos.replace(/3/g, "000");
      pos = pos.replace(/2/g, "00");
      pos = pos.replace(/1/g, "0");
      let rows = pos.split("/");
      const firstContent = rows[firstSquare.row][firstSquare.column];
      rows[firstSquare.row] = rows[[firstSquare.row]].replaceAt(
        firstSquare.column,
        "0"
      );
      rows[secondSquare.row] = rows[[secondSquare.row]].replaceAt(
        secondSquare.column,
        firstContent
      );

      return rows.join("/");
    });
  };

  handlePressField = (content, rowIndex, column) => {
    console.log(content);
    //click on the already red square
    if (rowIndex === currentSquare.row && column === currentSquare.column) {
      setCurrentSquare({ row: 9, column: 9 });
      //nothing selected yet so simply select
    } else if (currentSquare.row === 9 && currentSquare.column === 9) {
      if (isNaN(content)) {
        setCurrentSquare({ column: column, row: rowIndex });
        setCurrentContent(content);
      }
      //click while there is already something selected
    } else {
      makeMove(
        content,
        { row: currentSquare.row, column: currentSquare.column },
        { row: rowIndex, column: column }
      );
      //set outside so none is selected
      setCurrentSquare({ row: 9, column: 9 });
    }
    {
    }
  };

  notifyMessage = (msg) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  handleAddPosition = () => {
    setEntries((entries) => {
      entries.push({
        value: position,
        description: description,
        path: path,
        key: entries.length,
      });
    });
    console.log(entries);

    const docRef = firestore().collection("Lists").doc(route.params.listId);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Updating already existing doc ", route.params.listId);
          firestore().collection("Lists").doc(route.params.listId).update({
            elements: entries,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document, creating a new one!");
          firestore()
            .collection("Lists")
            .add({
              name: route.params.listName,
              elements: entries,
              pub: route.params.pub,
              creator: route.params.user,
              multiValue: route.params.multiValue,
              type: "chess",
            })
            .then(function (docRef) {
              route.params.listId = docRef;
              console.log("Document written with ID: ", docRef.id);
            });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    //TODO: onSnapshot still reads on an undefined listId document so updated list isnt
    //loaded in and entries.length is undefined (i dont even know why), so workaround: go to
    // explore screen and after reentering in the list everything will work fine
    //navigation.navigate("Home");
    notifyMessage("Nice");
  };

  pressFurther = () => {
    if (!(currentEntry + 2 > entries.length)) {
      setCurrentEntry(currentEntry + 1);
    }
  };

  pressBack = () => {
    if (!(currentEntry === 0)) {
      setCurrentEntry(currentEntry - 1);
    }
  };

  renderBoard = () => {
    currentPos = position;
    currentPos = currentPos.replace(/8/g, "00000000");
    currentPos = currentPos.replace(/7/g, "0000000");
    currentPos = currentPos.replace(/6/g, "000000");
    currentPos = currentPos.replace(/5/g, "00000");
    currentPos = currentPos.replace(/4/g, "0000");
    currentPos = currentPos.replace(/3/g, "000");
    currentPos = currentPos.replace(/2/g, "00");
    currentPos = currentPos.replace(/1/g, "0");
    let rows = currentPos.split("/");

    return [...rows].map((row, rowIndex) => {
      return renderRow(row, rowIndex);
    });
  };

  renderRow = (row, rowIndex) => {
    return (
      <View key={rowIndex} style={styles.row}>
        {[...row].map((square, column) => {
          return renderSquare(square, column, rowIndex);
        })}
      </View>
    );
  };

  renderSquare = (content, column, rowIndex) => {
    let shade = COLORS.third;
    if ((rowIndex + column) % 2 === 0) {
      shade = "white";
    }
    if (column === currentSquare.column && rowIndex === currentSquare.row) {
      shade = "red";
    }

    return (
      <View key={column + 10 * rowIndex}>
        <TouchableOpacity
          onPress={() => handlePressField(content, rowIndex, column)}
          style={{ backgroundColor: shade, height: 45, width: 45 }}
        >
          {renderPiece(content)}
        </TouchableOpacity>
      </View>
    );
  };

  renderPiece = (content) => {
    if (content === "k") {
      return <BlackKing />;
    }
    if (content === "K") {
      return <WhiteKing />;
    }
    if (content === "P") {
      return <WhitePawn />;
    }
    if (content === "p") {
      return <BlackPawn />;
    }
    if (content === "q") {
      return <BlackQueen />;
    }
    if (content === "Q") {
      return <WhiteQueen />;
    }
    if (content === "b") {
      return <BlackBishop />;
    }
    if (content === "B") {
      return <WhiteBishop />;
    }
    if (content === "n") {
      return <BlackKnight />;
    }
    if (content === "N") {
      return <WhiteKnight />;
    }
    if (content === "r") {
      return <BlackRook />;
    }
    if (content === "R") {
      return <WhiteRook />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        ViewComponent={LinearGradient} // Don't forget this!
        containerStyle={{ height: 60 }}
        linearGradientProps={{
          colors: [COLORS.main, "white"],
          start: { x: 0, y: 0.1 },
          end: { x: 1, y: 0.1 },
        }}
        centerComponent={<Text style={styles.headerText}>{listName}</Text>}
      />
      <View style={styles.chessContainer}>
        {renderBoard()}
        <View style={styles.descriptionView}>
          <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
            <Text style={styles.moves}>Go back</Text>
          </TouchableOpacity>
          <ScrollView
            ref={(ref) => (listView = ref)}
            horizontal={true}
            style={styles.scrollView}
            onContentSizeChange={() => listView.scrollToEnd({ animated: true })}
          >
            <Text style={styles.moves}>{path}</Text>
          </ScrollView>
        </View>
        <View style={styles.descriptionView}>
          <TextInput
            onChangeText={(text) => setDescription(text)}
            defaultValue={description}
            style={styles.textInput}
            placeholder={"Description"}
            maxLength={100}
          />
          <View style={styles.numIndicator}>
            <Text style={styles.currentEntry}>{currentEntry}</Text>
            <Button
              onPress={pressBack}
              buttonStyle={styles.furtherButton}
              icon={() => {
                return <Icon name="arrow-back" />;
              }}
            />
            <Button
              onPress={pressFurther}
              buttonStyle={styles.furtherButton}
              icon={() => {
                return <Icon name="arrow-forward" />;
              }}
            />
          </View>
        </View>
      </View>
      <Button
        title="ADD"
        onPress={handleAddPosition}
        buttonStyle={styles.okButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  chessContainer: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  okButton: {
    backgroundColor: COLORS.main,
    marginHorizontal: 10,
    marginTop: 10,
  },
  furtherButton: {
    backgroundColor: COLORS.main,
  },
  numIndicator: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  descriptionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  moves: {
    fontSize: 16,
    padding: 5,
  },
  scrollView: {
    marginLeft: 30,
    marginRight: 10,
    marginVertical: 10,
  },
  goBackButton: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
  movesContainer: {
    marginHorizontal: 50,
    marginVertical: 15,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  currentEntry: {
    fontSize: 18,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.second,
    //marginTop: -15,
    marginRight: 10,
  },
});
