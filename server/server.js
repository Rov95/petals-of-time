const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const db = require('./database');

const app = express();
const PORT = 5001;

// Enable CORS bañalds new 2
app.use(cors()); 
app.use(bodyParser.json());

// Endpoint to update or add user settings
app.post('/settings', (req, res) => {
  /* const { workPeriod, breakPeriod, longRest, sessionCount } = req.body; */
  const settingsData = {
    work_period: req.body.workPeriod, 
    break_period: req.body.breakPeriod, 
    long_rest: req.body.longRest, 
    session_count: req.body.sessionCount};

  // Debugging: Log request body
  console.log("Received settings:", req.body);

  const insertOrUpdateSettingsQuery = `
    INSERT INTO Settings_1 (work_period, break_period, long_rest, session_count, last_updated)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      work_period = excluded.work_period,
      break_period = excluded.break_period,
      long_rest = excluded.long_rest,
      session_count = excluded.session_count,
      last_updated = CURRENT_TIMESTAMP
  `;

  db.run(
    insertOrUpdateSettingsQuery,
    [settingsData.work_period,settingsData.break_period, settingsData.long_rest, settingsData.session_count], 
    function (err) {
      if (err) {
        console.error('Error updating settings:', err.message);
        return res.status(500).json({ error: 'Failed to update settings' });
      } 

      console.log("Rows updated:", this.changes);

      if (this.changes > 0) {
        res.status(200).json({ message: 'Settings updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update settings. No changes made.' });
      }
  });
});

// Endpoint to get user settings
app.get('/settings', (req, res) => {
  const getSettingsQuery = `SELECT * FROM Settings_1`;

  db.all(getSettingsQuery, [], (err, row) => {
    if (err) {
      console.error('Error retrieving settings:', err.message);
      return res.status(500).json({ error: 'Failed to retrieve settings' });
    }
    if (!row) {
      res.status(404).json({ error: 'Settings not found' });
    } else {
      res.status(200).json(row);
    }
  });
});


// Endpoint to add or update work hours for a day
app.post('/work-hours', (req, res) => {
  /* const { date, workTime, completedSessions } = req.body; */
  const workData = {
    date: req.body.date, 
    work_time: req.body.work_time, 
    completed_sessions: req.body.completed_sessions};

  console.log("Received workData:", workData, "Received req.body:", req.body);

  const insertOrUpdateQuery = `
    INSERT INTO WorkHours_1 (date, work_time, completed_sessions)
    VALUES (?, ?, ?)
    ON CONFLICT(date) DO UPDATE SET
      work_time = work_time + excluded.work_time,
      completed_sessions = completed_sessions + excluded.completed_sessions
  `;

  db.run(
    insertOrUpdateQuery, 
    [workData.date, workData.work_time, workData.completed_sessions], 
    function (err) {
      if (err) {
        console.error('Error updating work hours:', err.message);
        return res.status(500).json({ error: err.message });
      } else {
        console.log('Work hours updated:', this.changes);
        res.status(200).json({ message: 'Work hours updated successfully' });
      }
  });
});

// Endpoint to get work hours for chart
app.get('/work-hours', (req, res) => {
  const query = 'SELECT * FROM WorkHours_1 ORDER BY date ASC';

  db.all(query, [], (err, rows) => {
    console.log(rows);
    if (err) {
      console.error('Error retrieving work hours:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
