import { Request, Response } from 'express';
import db from '../models/database';

export const updateWorkHours = (req: Request, res: Response) => {
    const { date, work_time, completed_sessions } = req.body;
    const query = `
        INSERT INTO WorkHours_1 (date, work_time, completed_sessions)
        VALUES (?, ?, ?)
        ON CONFLICT(date) DO UPDATE SET
        work_time = work_time + excluded.work_time,
        completed_sessions = completed_sessions + excluded.completed_sessions
    `;

    db.run(query, [date, work_time, completed_sessions], function (err) {
        
        if (err) {
        console.error('Error updating work hours:', err.message);
        res.status(500).json({ error: 'Failed to update work hours' });
        } else {
        res.status(200).json({ message: 'Work hours updated successfully' });
        }
    });
    };

    export const getWorkHours = (_req: Request, res: Response) => {
    const query = `SELECT * FROM WorkHours_1 ORDER BY date ASC`;

    db.all(query, [], (err, rows) => {
        if (err) {
        console.error('Error retrieving work hours:', err.message);
        res.status(500).json({ error: 'Failed to retrieve work hours' });
        } else {
        res.status(200).json(rows);
        }
    });
};
