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
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null

    },
    mobile: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)