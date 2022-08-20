const mongoose = require('mongoose')

const Message = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        content: { type: String, required: true },
    },
    {timestamps:true}
)

const model = mongoose.model('MessageData', Message)

module.exports = model