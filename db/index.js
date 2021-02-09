import React from "react";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const name = "batuta.db";
export const db = SQLite.openDatabase(name);

// const sqliteDirectory = `${FileSystem.documentDirectory}/SQLite`;
// const localSqliteDB = `${SQLITE_DIRECTORY}/${DB_NAME}`;

// export default class Database extends React.Component {
//   constructor() {
//     super();
//     this.db = SQLite.openDatabase(DB_NAME);
//   }

//   getAllTableRows(tableName) {
//     // sql query for getting all table rows
//     // console.log(`Got all rows from table ${tableName} in ${DB_NAME} located at ${LOCAL_SQLITE_DB})
//   }

//   addRowToTable(tableName, item) {
//     // sql query for
//     // {key:colValue, key:colValue,} for key in obj columString "(" + `_${key}` + `_${key}` + `_${key}`
//     // at the end add the closing brace to the strong columnString + "_)"
//     // do the same as above for values for obj[key] in obj columString "(" + `_${value}` + `_${value}` + `_${value}`
//   }

//   deleteRowFromTable(tableName, item) {
//     // sql query for
//     // with Delete from TABLENAME WHERE key = item[key] AND key = item[key]
//   }
// }
