import request from 'supertest';
import faker from 'faker';

import { app } from '../../../../../server';

const server = request.agent(app);

describe('keynote create', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/login').send({ email, password });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);

        done();
    });

    test('should return 201 for post keynote', async (done) => {
        const response = await server.post('/lessons/:lessonHash/keynotes');

        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return an object type for posting keynote', async (done) => {
        const response = await server.post('/lessons/:lessonHash/keynotes');
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
