import React from "react";
import { Alert, Button, View, TouchableOpacity } from "react-native";
import { db } from "../../db/index"; //importing database
import { GoToButton } from "./index";

export default function CreateFlashcard() {
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY NOT NULL, content_type ENUM("image", "audio", "text"), input_content MEDIUMTEXT, input_text TEXT, source_language TEXT, translated_text TEXT, target_language TEXT);`
      );
    });
  }, []);

  // const createOkButtonAlert = () => {
  //   Alert.alert(
  //     "Flashcard was successfully made!",
  //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
  //     { cancelable: false }
  //   );
  // };

  return (
    <View>
      <TouchableOpacity>
        <GoToButton screenName="Flashcards" />
      </TouchableOpacity>
    </View>
  );
}

// {
//   id:
//   content_type: ["image", "audio", "text"]
//   input_content:
//   input_text:
//   source_language:
//   translated_text:
//   target_language:
// }
