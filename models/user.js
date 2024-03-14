const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
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
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
