const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        emailId: {
            type: String,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        password: {
            type: String,
        },
    },
    { collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
