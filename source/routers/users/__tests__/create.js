import request from 'supertest';
import { name, internet, phone } from 'faker';

import { app } from '../../../server';

const getUser = () => ({
    name:     `${name.firstName()} ${name.lastName()}`,
    emails:   {email: internet.email()},
    phones:   {phone: phone.phoneNumber()},
    password: internet.password(),
    sex:      'm',
});

const server = request.agent(app);

describe('user create', () => {
    test('should return 201 for post user', async (done) => {
        const response = await server.post('/users').send(getUser());

        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return an object type for posting user', async (done) => {
        const response = await server.post('/users').send(getUser());
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
