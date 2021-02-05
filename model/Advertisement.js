'use strict';

const mongoose = require('mongoose');

//Schema

const advertisementSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    image: String,
    tags: [String]
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;