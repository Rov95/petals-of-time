// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// // Path to SQLite database file
// const dbPath = path.resolve(__dirname, 'userData.db');

// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to SQLite database.');
//   }
// });

// db.serialize(() => {
//   // Create the Settings table that stores user preferences
//   db.run(`
//     CREATE TABLE IF NOT EXISTS Settings_1 (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       work_period INTEGER NOT NULL DEFAULT 0,
//       break_period INTEGER NOT NULL DEFAULT 0,
//       long_rest INTEGER NOT NULL DEFAULT 0,
//       session_count INTEGER NOT NULL DEFAULT 0,
//       last_updated TEXT
//     )
//   `, (err) => {
//     if (err) {
//       console.error('Error creating Settings_1 table:', err.message);
//     } else {
//       console.log('Settings_1 table created successfully.');
//     }
//   });

//   // Create the WorkHours table that stores user's daily work hours
//   db.run(`
//     CREATE TABLE IF NOT EXISTS WorkHours_1 (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       date TEXT UNIQUE,
//       work_time INTEGER NOT NULL DEFAULT 0,
//       completed_sessions INTEGER NOT NULL DEFAULT 0
//     )
//   `, (err) => {
//     if (err) {
//       console.error('Error creating WorkHours_1 table:', err.message);
//     } else {
//       console.log('WorkHours_1 table created successfully.');
//     }
//   });
// });

// module.exports = db;
