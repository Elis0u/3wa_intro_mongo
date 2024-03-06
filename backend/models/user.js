import mongoose from 'mongoose';

const Schema = mongoose.Schema

const User = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        minLength: 5,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 8
    }
})

export default mongoose.model('User', User)