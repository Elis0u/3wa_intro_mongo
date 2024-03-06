import mongoose from 'mongoose';

const Schema = mongoose.Schema

const Team = new Schema({
    name: String
})

export default mongoose.model('Team', Team)