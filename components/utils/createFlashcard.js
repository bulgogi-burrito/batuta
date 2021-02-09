import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { db } from "../../db/index"; //importing database

export default function CreateFlashcard(props) {
  let { translationData } = props;
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY NOT NULL, content_type ENUM("image", "audio", "text"), input_content MEDIUMTEXT, input_text TEXT, source_language TEXT, translated_text TEXT, target_language TEXT);`
      );
    });
  }, []);

  const add = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into flashcards (content_type, input_content, input_text, source_language, translated_text, target_language) values (?, ?, ?, ?, ?, ?)",
        [
          translationData.content_type,
          translationData.input_content,
          translationData.input_text,
          translationData.source_language,
          translationData.translated_text,
          translationData.target_language,
        ]
      );
      tx.executeSql("select * from flashcards", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => add()}>
        <Text>Create Flashcard</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapState = (state) => {
  return {
    translationData: state.recentTranslations[0],
  };
};

export default connect(mapState)(CreateFlashcard);
