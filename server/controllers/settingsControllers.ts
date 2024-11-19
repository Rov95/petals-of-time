import { Request, Response } from 'express';
import db from '../models/database';

export const updateSettings = (req: Request, res: Response) => {
    const { workPeriod, breakPeriod, longRest, sessionCount } = req.body;
    const query = `
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
        query,
        [workPeriod, breakPeriod, longRest, sessionCount],
        function (err) {
        if (err) {
            console.error('Error updating settings:', err.message);
            res.status(500).json({ error: 'Failed to update settings' });
        } else {
            res.status(200).json({ message: 'Settings updated successfully' });
        }
        }
    );
    };

    export const getSettings = (_req: Request, res: Response) => {
    const query = `SELECT * FROM Settings_1`;

    db.all(query, [], (err, rows) => {
        if (err) {
        console.error('Error retrieving settings:', err.message);
        res.status(500).json({ error: 'Failed to retrieve settings' });
        } else {
        res.status(200).json(rows);
        }
    });
};


