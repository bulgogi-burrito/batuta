import * as SQLite from "expo-sqlite";

const name = "batuta.db";
// const sqliteDirectory = `${FileSystem.documentDirectory}/SQLite`;
// const localSqliteDB = `${SQLITE_DIRECTORY}/${DB_NAME}`;

const db = SQLite.openDatabase(name);

export { db };
