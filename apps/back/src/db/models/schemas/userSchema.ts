import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    safeQuestion: {
        type: String,
        required: true
    },
    safeAnswer: {
        type: String,
        required: true
    },
    presentation: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, safeAnswer, ...user } = this.toObject();
    return user;
}
