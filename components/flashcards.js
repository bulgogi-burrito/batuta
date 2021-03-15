import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { db } from "../db/index";
import { Flashcard, Card } from "./utils";

function Items(props) {
  const [items, setItems] = React.useState(null);
  const { onPressItem } = props;
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from flashcards;`,
        [],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    return null;
  }
  const orderedLatest = [...items].reverse();
  return (
    <View style={styles.sectionContainer}>
      {orderedLatest.map((flashcard, idx) => (
        <Flashcard
          flashcard={flashcard}
          key={flashcard.id}
          deleteItem={onPressItem}
        />
      ))}
    </View>
  );
}

export default function Flashcards() {
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists flashcards (id integer primary key not null, content_type text, input_content text, input_text text, source_language text, translated_text text, target_language text);"
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your latest flashcards</Text>
      <ScrollView style={styles.listArea}>
        <Items
          key={`forceupdate-todo-${forceUpdateId}`}
          onPressItem={(id) =>
            db.transaction(
              (tx) => {
                tx.executeSql(`delete from flashcards where id = ?;`, [id]);
              },
              null,
              forceUpdate
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  heading: {
    color: "gray",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});
