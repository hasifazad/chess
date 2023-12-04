const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    question: {
        type: String
    },
    options: {
        type: [String]
    },
    answer: {
        type: String,
    },
    subject: {
        type: String
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("Quiz", quizSchema)