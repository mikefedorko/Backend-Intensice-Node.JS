import request from 'supertest';
import faker from 'faker';

import { app } from '../../../../server';

const server = request.agent(app);

describe('lesson update by hash', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/login').send({ email, password });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);

        done();
    });

    test('should return 200 for updating lesson by hash', async (done) => {
        const response = await server.put('/lessons/:lessonHash');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return an object type for updating lesson by hash', async (done) => {
        const response = await server.put('/lessons/:lessonHash');
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
