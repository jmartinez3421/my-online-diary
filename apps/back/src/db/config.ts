import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_DEV!);

        console.log('DB Connected');
    } catch (err) {
        console.log(err);
        throw new Error('Error initializing the database');
    }
}
