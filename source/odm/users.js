import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const userSchema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default:  () => v4(),
        },
        name: {
            first: {
                type:     String,
                required: true,
            },
            last: {
                type:     String,
                required: true,
            },
        },
        emails: [
            {
                email: {
                    type:     String,
                    unique:   true,
                    required: true,
                },
                primary: Boolean,
            },
        ],
        phones: [
            {
                phone: {
                    type:     String,
                    required: true,
                },
                primary: Boolean,
            },
        ],
        password: {
            type:     String,
            select:   false,
            required: true,
        },
        sex: {
            type:     String,
            enum:     [ 'm', 'f' ],
            required: true,
        },
        roles: [
            {
                type:    String,
                default: 'newbie',
                enum:    [ 'newbie', 'student', 'teacher' ],
            },
        ],
        socials: {
            facebook: String,
            linkedin: String,
            github:   String,
            skype:    String,
        },
        notes:    String,
        disabled: Boolean,
    },
    { timestamp: { createdAt: 'created', updatedAt: 'modified' } },
);

userSchema.index({ 'name.first': 1, 'name.last': 1 }, { name: 'flName' });
userSchema.index({ notes: 'text' }, { name: 'notes' });

const users = mongoose.model('users', userSchema);

export  { users };

users.createIndexes();
