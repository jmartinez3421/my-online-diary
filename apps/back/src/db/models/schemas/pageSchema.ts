import { Schema } from 'mongoose';

export const PageSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    feeling: {
        type: String,
        default: 'normal',
        enumerable: ['happy', 'normal', 'sad', '-']
    },
    main: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    music: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

PageSchema.methods.toJSON = function () {
    const { __v, ...page } = this.toObject();
    return page;
}
