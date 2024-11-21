import request from 'supertest';
import app from '../../server/index'; 


describe('Work Hours Endpoints', () => {

    describe('POST /work-hours', () => {
        it('should add or update work hours successfully', async () => {
        const payload = {
            date: '2024-11-16',
            work_time: 120,
            completed_sessions: 2,
        };

        const response = await request(app)
            .post('/work-hours')
            .send(payload);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Work hours updated successfully');
        });

        it('should return 500 if the database fails', async () => {
        const payload = {
            date: null, 
            work_time: undefined,
            completed_sessions: 2,
        };

        const response = await request(app)
            .post('/work-hours')
            .send(payload);

        expect(response.status).toBe(500);
        expect(response.body.error).toBeDefined();
        });
    });

    describe('GET /work-hours', () => {
        it('should retrieve work hours successfully', async () => {
        const response = await request(app).get('/work-hours');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Expect an array of work hours
        });
    });
});
