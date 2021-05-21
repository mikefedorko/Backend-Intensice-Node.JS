import request from 'supertest';

import { app } from '../../../server';

const server = request.agent(app);

describe('lesson read', () => {
    test('should return 200 for getting all lessons', async (done) => {
        const response = await server.get('/lessons');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return an array type for getting all lessons', async (done) => {
        const response = await server.get('/lessons');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
