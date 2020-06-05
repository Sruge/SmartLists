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

export default ChessBoard = (props) => {
  const money = props.path
  console.log('money',money)
  const route = useRoute();
  const [currentSquare, setCurrentSquare] = useState({ row: 9, column: 9 });
  const [position, setPosition] = useState(props.position);
  console.log(props)

  const [currentEntry, setCurrentEntry] = useState(0);
  const [entries, setEntries] = useState([]);
  const [currentContent, setCurrentContent] = useState(0);


  makeMove = (content, firstSquare, secondSquare) => {
    const letters = "ABCDEFGH";
    const numbers = "87654321";


    console.log(firstSquare.row, secondSquare.column);
    setPosition((pos) => {
      pos = props.position
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


  renderBoard = (pos) => {
    console.log('renderring new boards', pos)
    currentPos = pos;
    currentPos = currentPos.replace(/8/g, "00000000");
    currentPos = currentPos.replace(/7/g, "0000000");
    currentPos = currentPos.replace(/6/g, "000000");
    currentPos = currentPos.replace(/5/g, "00000");
    currentPos = currentPos.replace(/4/g, "0000");
    currentPos = currentPos.replace(/3/g, "000");
    currentPos = currentPos.replace(/2/g, "00");
    currentPos = currentPos.replace(/1/g, "0");
    let rows = currentPos.split("/");

    return (<View >{rows.map((row, rowIndex) => {
      console.log('doing somethin wit a row ', row)
      return renderRow(row, rowIndex);
    })}
    </View>)
  };

  renderRow = (row, rowIndex) => {
    console.log(props.style)
    return (
      <View key={rowIndex} style={styles.row}>
        {[...row].map((square, column) => {
          return renderSquare(square, column, rowIndex);
        })}
      </View>
    );
  };

  renderSquare = (content, column, rowIndex) => {
    console.log('rendering square')
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
        {renderBoard(props.position)}
        <View>
          <Text>Hello its a board</Text>
        </View>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <Text style={styles.moves}>{props.path}</Text>
        </ScrollView>
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
    justifyContent: 'space-between'
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
    marginRight: 5,
  },
  scrollView: {
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
});
