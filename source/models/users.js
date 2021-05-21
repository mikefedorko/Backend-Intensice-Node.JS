// Core
import bcrypt from 'bcrypt';

// In model we doing some functionality and save data to db
import { users } from '../odm';
import { NotFoundError } from '../utils';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async create() {
        // return this.data to odm level (where creating Schema and Model)
        const user = await this._transformCreateUser(this.data);
        const data = await users.create(user);

        return data;
    }


    async getAll() {
        const { page, size } = this.data;
        const total = await users.countDocuments();
        const offset = (page - 1) * size;

        const data = await users
            .find({})
            .sort('-created')
            .skip(offset)
            .limit(size)
            .select('-__v -id')
            .lean();

        return {
            data,
            meta: {
                total,
                page,
                size,
            },
        };
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await users
            .findOne({ hash })
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await users.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await users.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }


    async _transformCreateUser(data) {
        const { name, email, phone, password, sex, role } = data;
        const hashedPassword = await bcrypt.hash(password, 11);
        const [ first, last ] = name.split(' ');
        const user = {
            name: {
                first,
                last,
            },
            sex,
            emails:   [{ email, primary: true }],
            roles:    [ role ],
            phones:   [{ phone, primary: true }],
            password: hashedPassword,
        };

        return user;
    }
}
