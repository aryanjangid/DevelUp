const mongoose = require('mongoose')

const Message = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        content: { type: String, required: true },
    },
)

const ChatRoom = new mongoose.Schema(
    {
        name: { type: String, required: true },
        roomId: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        messages: [Message]
    },
)

const model = mongoose.model('ChatRoomData', ChatRoom)

module.exports = model