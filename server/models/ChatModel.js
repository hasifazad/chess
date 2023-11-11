const mongoose = require('mongoose')

const chat = new mongoose.Schema({
    sender: {
        type: mongoose.SchemaTypes.ObjectId
    },
    reciver: {
        type: mongoose.SchemaTypes.ObjectId
    },
    message: {
        type: String
    }
}, { timestamps: true })

const MessageSchema = new mongoose.Schema({
    person: [mongoose.SchemaTypes.ObjectId, mongoose.SchemaTypes.ObjectId],
    chat: [chat]
})





module.exports = mongoose.model('Chat', MessageSchema)