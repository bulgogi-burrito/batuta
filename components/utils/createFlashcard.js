import { db } from "../../db/index"; //importing database

const createFlashcard = (data) => {
  const SQL = `insert into flashcards (content_type, input_content, input_text, source_language, translated_text, target_language) values (${data["content_type"]}, ${data.input_content}, ${data.input_text}, ${data.source_language}, ${data.translated_text}, ${data.target_language})`;
  db.transaction((tx) => {
    tx.executeSql(SQL);
    tx.executeSql("select * from flashcards", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  });
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
