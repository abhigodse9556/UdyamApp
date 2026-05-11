import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("udyamApp.db");

export default db;
