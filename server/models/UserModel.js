const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please enter the email id"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    image: {
        type: String,
        default: null

    },
    mobile: {
        type: Number,
        default: null
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)