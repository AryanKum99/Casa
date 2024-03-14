const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
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
        password: {
            type: String,
        },
        typeOfSeller: {
            type: String,
        },
        workSample: {
            type: [String],
            default: []
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },
    { collection: "Seller" }
);

module.exports = mongoose.model("Seller", sellerSchema);
