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
};
export default createFlashcard;
