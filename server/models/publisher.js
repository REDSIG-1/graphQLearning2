const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    name: String,
    location: String,
    publisherId: String
})

module.exports = mongoose.model('Publisher', publisherSchema)
