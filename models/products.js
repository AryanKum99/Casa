const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    }
})