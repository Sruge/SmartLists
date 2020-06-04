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
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
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

export default Chess = () => {
  const [lists, setLists] = useState();
  const route = useRoute();
  let position = "rnbqkbnr/pppppppp/6p1/8/8/8/PPPPPPPP/RNBQKBNR";
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

  renderBoard = () => {
    position = position.replace(/8/g, "00000000");
    position = position.replace(/7/g, "0000000");
    position = position.replace(/6/g, "000000");
    position = position.replace(/5/g, "00000");
    position = position.replace(/4/g, "0000");
    position = position.replace(/3/g, "000");
    position = position.replace(/2/g, "00");
    position = position.replace(/1/g, "0");
    console.log(position);
    const rows = position.split("/");

    return [...rows].map((row, rowIndex) => {
      return renderRow(row, rowIndex);
    });
  };

  renderRow = (row, rowIndex) => {
    return (
      <View style={styles.row}>
        {[...row].map((square, index) => {
          return renderSquare(square, index, rowIndex);
        })}
      </View>
    );
  };

  renderSquare = (content, index, rowIndex) => {
    console.log(rowIndex + index);
    let shade = "grey";
    if ((rowIndex + index) % 2 === 0) {
      shade = "white";
    }

    return (
      <View style={{ backgroundColor: shade, height: 45, width: 45 }}>
        {renderPiece(content)}
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
      return <BlackBishop style={{ marginTop: 30 }} />;
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

  return <SafeAreaView style={styles.container}>{renderBoard()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
  },
});
