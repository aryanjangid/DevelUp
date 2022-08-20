const mongoose = require('mongoose')


const Room = new mongoose.Schema(
    {
        name: { type: String, required: true },
        room: { type: String, required: true },
    },
)

const mentee = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        skills: { type: Array },
        rooms: [Room],
    },
    { collection: 'mentee-data' }
)

const model = mongoose.model('menteeData', mentee)

module.exports = model