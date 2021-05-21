import { Users as UsersModel } from '../models';

export class Users {
    constructor(data) { // data - req.body
        this.models = {
            users: new UsersModel(data),
        };
    }

    async create() {
        const data = await this.models.users.create();

        return data;
    }

    async getAll () {
        const data = await this.models.users.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.users.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.users.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.users.removeByHash();

        return data;
    }
}
