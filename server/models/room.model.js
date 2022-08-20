const mongoose = require('mongoose')

const Room = new mongoose.Schema(
    {
        name: { type: String, required: true },
        room: { type: Stirng, required: true },
    },
    { timestamps: true }
)

const model = mongoose.model('RoomData', Room)

module.exports = model