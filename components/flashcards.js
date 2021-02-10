import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { db } from "../db/index"; //importing database

export default function Flashcards() {
  const [flashcards, setFlashcards] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from flashcards;`,
        null,
        (_, { rows: { _array } }) => setFlashcards(_array)
      );
    });
  }, []);

  return (
    <View>
      {flashcards &&
        flashcards.map(({ id, input_text }) => (
          <TouchableOpacity
            key={id}
            // onPress={() =>}
            style={{
              borderColor: "#000",
              borderWidth: 1,
              padding: 8,
            }}
          >
            <Text>{input_text}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
