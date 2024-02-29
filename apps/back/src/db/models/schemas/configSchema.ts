import {Schema} from 'mongoose';

export const ConfigSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    locale: {
        type: String,
        default: 'en',
        required: true
    },
    quote: {
        type: Boolean,
        default: true,
        required: true
    },
    theme: {
        type: String,
        default: 'default',
        required: true
    }
});

ConfigSchema.methods.toJSON = function () {
    const {__v, ...config} = this.toObject();
    return config;
};
