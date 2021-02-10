import { db } from "../../db/index"; //importing database

const createFlashcard = (data) => {
  const {
    content_type,
    input_content,
    input_text,
    source_language,
    translated_text,
    target_language,
  } = data;
  db.transaction((tx) => {
    tx.executeSql(
      "insert into flashcards (content_type, input_content, input_text, source_language, translated_text, target_language) values (?, ?, ?, ?, ?, ?)",
      [
        content_type,
        input_content,
        input_text,
        source_language,
        translated_text,
        target_language,
      ]
    );
    tx.executeSql("select * from flashcards", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  });

  // const SQL = `insert into flashcards (content_type, input_content, input_text, source_language, translated_text, target_language) values (${data.content_type}, ${data.input_content}, ${data.input_text}, ${data.source_language}, ${data.translated_text}, ${data.target_language})`;
  // db.transaction((tx) => {
  //   tx.executeSql(SQL);
  //   tx.executeSql("select * from flashcards", [], (_, { rows }) =>
  //     console.log(JSON.stringify(rows))
  //   );
  // });
};
export default createFlashcard;

// db.transaction(
//   (tx) => {
//     tx.executeSql(
//       `insert into flashcards (content_type, input_content, input_text, source_language, translated_text, target_language) values (${data.content_type}, ${data.input_content}, ${data.input_text}, ${data.source_language}, ${data.translated_text}, ${data.target_language})`
//     );
//     tx.executeSql("select * from flashcards", [], (_, { rows }) =>
//       console.log(JSON.stringify(rows))
//     );
//   },
// );
//
//
//
// import React, { useState } from "react";
// import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// import { db } from "../db/index"; //importing database

// export default function Flashcards() {
//   const [flashcards, setFlashcards] = React.useState(null);

//   React.useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `select * from flashcards;`,
//         null,
//         (_, { rows: { _array } }) => setFlashcards(_array)
//       );
//     });
//   }, []);

//   return (
//     <View>
//       {flashcards &&
//         flashcards.map(({ id, input_text }) => (
//           <TouchableOpacity
//             key={id}
//             // onPress={() =>}
//             style={{
//               borderColor: "#000",
//               borderWidth: 1,
//               padding: 8,
//             }}
//           >
//             <Text>{input_text}</Text>
//           </TouchableOpacity>
//         ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     flex: 1,
//   },
// });
