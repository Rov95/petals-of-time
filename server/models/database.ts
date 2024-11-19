import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../userData.db');

const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to SQLite database.');
        }
    });

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS Settings_1 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            work_period INTEGER NOT NULL DEFAULT 0,
            break_period INTEGER NOT NULL DEFAULT 0,
            long_rest INTEGER NOT NULL DEFAULT 0,
            session_count INTEGER NOT NULL DEFAULT 0,
            last_updated TEXT
            )
    `);

    db.run(`
            CREATE TABLE IF NOT EXISTS WorkHours_1 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT UNIQUE,
            work_time INTEGER NOT NULL DEFAULT 0,
            completed_sessions INTEGER NOT NULL DEFAULT 0
        )
    `);
});

export default db;
