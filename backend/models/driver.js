import mongoose from 'mongoose';

const Schema = mongoose.Schema

const Driver = new Schema({
    first_name: String,
    last_name: String,
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
})

export default mongoose.model('Driver', Driver)