const mongoose = require('mongoose');

//schema-set of rules to define structure of document in mongodb
const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Food', FoodSchema);