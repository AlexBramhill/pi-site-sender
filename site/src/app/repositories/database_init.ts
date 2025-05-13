import Database from "better-sqlite3";
import { MINUTES_IN_DAYS } from "../consts/time";
import { TABLE_NAMES } from "../schemas/database/database-table-names";

const db = new Database("database.db");

const getNewTableSql = (tableName: string) => `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        is_success INTEGER NOT NULL,
        fetched_at DATE NOT NULL,
        data TEXT NULL,
        error TEXT NULL
    );
`;

const getLimitOnEntriesSql = (tableName: string) => `
    CREATE TRIGGER IF NOT EXISTS limit_${tableName}_entries
    AFTER INSERT ON ${tableName}
    BEGIN
        DELETE FROM ${tableName} WHERE id NOT IN (
            SELECT id FROM ${tableName} ORDER BY id DESC LIMIT ${MINUTES_IN_DAYS}
        );
    END;
`;

const initDatabase = () => {
  console.log("Initializing database...");
  TABLE_NAMES.forEach((tableName) => {
    db.exec(getNewTableSql(tableName));
    db.exec(getLimitOnEntriesSql(tableName));
  });
};

initDatabase();

export default db;
