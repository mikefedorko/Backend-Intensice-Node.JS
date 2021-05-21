import mongoose from 'mongoose';
import v4 from 'uuid/v4';

// Instruments
import { users } from './';
import { lessons } from './lessons';

const classSchema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default:  () => v4(),
        },
        title:       String,
        description: String,
        students:    [
            {
                user: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  users,
                },
                status: {
                    type: String,
                    enum: [ 'standard', 'select', 'premium' ],
                },
                expelled: Boolean,
                notes:    String,
            },
        ],
        lessons: [
            {
                lesson: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  lessons,
                },
                scheduled: Date,
            },
        ],
        duration: {
            started: {
                type:     Date,
                required: true,
            },
            closed: {
                type:     Date,
                required: true,
            },
        },
        order: Number,
    },
    { timestamp: { createdAt: 'created', updatedAt: 'modified' } },
);

classSchema.index({ title: 'text', description: 'text' });
classSchema.index({ order: 1 }, { name: 'order' });

const classes = mongoose.model('classes', classSchema);

export  { classes };

classes.createIndexes();
