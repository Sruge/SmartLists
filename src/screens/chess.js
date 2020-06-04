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
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";
import { Image, ListItem } from "react-native-elements";
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

export default Chess = () => {
  const [lists, setLists] = useState();
  const route = useRoute();
  const [description, setDescription] = useState();
  const navigation = useNavigation();
  const [currentSquare, setCurrentSquare] = useState({ row: 9, column: 9 });
  const [position, setPosition] = useState(
    "rnbqkbnr/pppppppp/6p1/8/8/8/PPPPPPPP/RNBQKBNR"
  );
  const [path, setPath] = useState(["Moves: "]);
  useEffect(() => {
    console.log(route.params.userEmail);
    const subscriber = firestore()
      .collection("Lists")
      .where("type", "==", "chess")
      .onSnapshot((querySnapshot) => {
        const lists = [];

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            value: documentSnapshot.get("name"),
            key: documentSnapshot.id,
            len: documentSnapshot.get("elements").length.toString(),
          });
        });

        setLists(lists);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);

  String.prototype.replaceAt = function (index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  };

  makeMove = (firstSquare, secondSquare) => {
    const letters = "ABCDEFGH";
    const numbers = "87654321";
    setPath((path) => {
      pos = position;
      pos = pos.replace(/8/g, "00000000");
      pos = pos.replace(/7/g, "0000000");
      pos = pos.replace(/6/g, "000000");
      pos = pos.replace(/5/g, "00000");
      pos = pos.replace(/4/g, "0000");
      pos = pos.replace(/3/g, "000");
      pos = pos.replace(/2/g, "00");
      pos = pos.replace(/1/g, "0");
      let rows = pos.split("/");
      path.push(
        path.length.toString() +
          ". " +
          rows[firstSquare.row][firstSquare.column].toString() +
          "  " +
          letters[firstSquare.column].toString() +
          numbers[firstSquare.row.toString()] +
          " - " +
          letters[secondSquare.column].toString() +
          numbers[secondSquare.row.toString()]
      );
      return path;
    });
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

  handlePressField = (rowIndex, column) => {
    //click on the already red square
    if (rowIndex === currentSquare.row && column === currentSquare.column) {
      setCurrentSquare({ row: 9, column: 9 });
      //nothing selected yet so simply select
    } else if (currentSquare.row === 9 && currentSquare.column === 9) {
      setCurrentSquare({ column: column, row: rowIndex });
      //click while there is already something selected
    } else {
      makeMove(
        { row: currentSquare.row, column: currentSquare.column },
        { row: rowIndex, column: column }
      );
      setCurrentSquare({ row: 9, column: 9 });
    }
    {
    }
  };

  handleAddPosition = () => {
    const docRef = firestore()
      .collection("ChessLists")
      .doc(route.params.listName);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Updating already existing doc ", route.params.listName);
          firestore()
            .collection("ChessLists")
            .doc(route.params.listName)
            .update({
              description: description,
              path: path,
              position: position,
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document, creating a new one!");
          firestore().collection("ChessLists").add({
            name: route.params.listName,
            description: description,
            path: path,
            position: position,
            pub: route.params.pub,
            creator: route.params.userEmail,
            multiValue: route.params.multiValue,
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    navigation.navigate("Explore");
  };

  renderSquare = (content, column, rowIndex) => {
    let shade = "grey";
    if ((rowIndex + column) % 2 === 0) {
      shade = "white";
    }
    if (column === currentSquare.column && rowIndex === currentSquare.row) {
      shade = "red";
    }

    return (
      <View key={column + 10 * rowIndex}>
        <TouchableOpacity
          onPress={() => handlePressField(rowIndex, column)}
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
      <View style={styles.chessContainer}>
        {renderBoard()}
        <ScrollView horizontal={true} style={styles.ScrollView}>
          {path.map((entry, index) => {
            return (
              <Text key={index} style={styles.moves}>
                {entry}
              </Text>
            );
          })}
        </ScrollView>
        <TextInput
          onChangeText={(text) => setDescription(text)}
          defaultValue={description}
          style={styles.textInput}
          placeholder={"Description"}
          maxLength={100}
        />
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
    backgroundColor: "#f4511e",
    marginHorizontal: 10,
  },
  moves: {
    fontSize: 16,
    marginRight: 5,
  },
  ScrollView: {
    marginHorizontal: 50,
    marginTop: 15,
  },
  textInput: {
    padding: 15,
  },
});
