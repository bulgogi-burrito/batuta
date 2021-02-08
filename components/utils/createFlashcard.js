import React from "react";
import { Alert, Button, View } from "react-native";
import { Database } from "../db/index"; //importing database
const createOkButtonAlert = () => {
  Alert.alert(
    "Flashcard was successfully made!",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

//need to pass in function to create card and send to SqlLite db to make card instance
export default function CreateFlashcard() {
  React.useEffect(() => {
    Database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY NOT NULL, content_type ENUM("image", "audio", "text"), input_content MEDIUMTEXT, input_text TEXT, source_language TEXT, translated_text TEXT, target_language TEXT);`
      );
    });
  }, []);

  return (
    <View>
      <Button title={"Make flashcard"} onPress={createOkButtonAlert} />
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
