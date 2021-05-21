import request from 'supertest';
import faker from 'faker';

import { app } from '../../../server';

const server = request.agent(app);

describe('class create', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/login').send({ email, password });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);

        done();
    });

    test('should return 201 for post class', async (done) => {
        const response = await server.post('/classes');

        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return an object type for posting class', async (done) => {
        const response = await server.post('/classes');
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
