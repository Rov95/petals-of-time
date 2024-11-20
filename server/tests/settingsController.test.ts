import request from 'supertest';
import app from '../../server/index'; 

describe('Settings Endpoints', () => {
    describe('POST /settings', () => {
        it('should update or create settings successfully', async () => {
        const payload = {
            workPeriod: 25,
            breakPeriod: 5,
            longRest: 15,
            sessionCount: 4,
        };

        const response = await request(app)
            .post('/settings')
            .send(payload);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Settings updated successfully');
        });

        it('should return 500 if the database fails', async () => {
        const payload = {
            workPeriod: null, 
            breakPeriod: 5,
            longRest: 15,
            sessionCount: 4,
        };

        const response = await request(app)
            .post('/settings')
            .send(payload);

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to update settings');
        });
    });

    describe('GET /settings', () => {
        it('should retrieve settings successfully', async () => {
        const response = await request(app).get('/settings');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Expect an array of settings
        });

        it('should return 404 if no settings are found', async () => {
        const response = await request(app).get('/settings');
        if (response.body.length === 0) {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Settings not found');
        } else {
            expect(response.status).toBe(200); // Handle cases where the database isn't empty
        }
        });
    });
});
