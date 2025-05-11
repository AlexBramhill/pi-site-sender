import Database from "better-sqlite3";
import { MINUTES_IN_DAYS } from "../consts/time";

// Initialize the database
const db = new Database("database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS tube (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        is_success INTEGER NOT NULL,
        last_fetched DATE NOT NULL,
        data TEXT NOT NULL
    );
`);

db.exec(`
    CREATE TRIGGER IF NOT EXISTS limit_tube_entries
    AFTER INSERT ON tube
    BEGIN
        DELETE FROM tube WHERE id NOT IN (
            SELECT id FROM tube ORDER BY id DESC LIMIT ${MINUTES_IN_DAYS}
        );
    END;
`);

// Create the `weather_data` table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS weather (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        last_fetched TEXT NOT NULL,
        data TEXT NOT NULL
    );
`);

db.exec(`
    CREATE TRIGGER IF NOT EXISTS limit_weather_entries
    AFTER INSERT ON weather
    BEGIN
        DELETE FROM weather WHERE id NOT IN (
            SELECT id FROM weather ORDER BY id DESC LIMIT ${MINUTES_IN_DAYS}
        );
    END;
`);

export default db;
