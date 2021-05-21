import request from 'supertest';
import faker from 'faker';

import { app } from '../../../../server';

const server = request.agent(app);

describe('classs create enroll', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/login').send({ email, password });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);

        done();
    });

    test('should return 201 for post enroll', async (done) => {
        const response = await server.post('/classes/:classHash/enroll');

        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return an object type for posting enroll', async (done) => {
        const response = await server.post('/classes/:classHash/enroll');
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});

describe('classs create expel', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/login').send({ email, password });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);

        done();
    });

    test('should return 204 for post expel', async (done) => {
        const response = await server.post('/classes/:classHash/expel');

        expect(response.statusCode).toBe(204);
        done();
    });
});
