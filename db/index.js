import * as SQLite from "expo-sqlite";

const name = "batuta.db";
// const sqliteDirectory = `${FileSystem.documentDirectory}/SQLite`;
// const localSqliteDB = `${SQLITE_DIRECTORY}/${DB_NAME}`;

const db = SQLite.openDatabase(name);
db.transaction((tx) => {
  tx.executeSql(
    `create table if not exists flashcards (id integer primary key not null, content_type text, input_content text, input_text text, source_language text, translated_text text, target_language text)`
  );
});
// React.useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `create table if not exists items (id integer primary key not null, content_type text, input_content text, input_text text, source_language text, translated_text text, target_language text)`
//       );
//     });
//   }, []);

export { db };
