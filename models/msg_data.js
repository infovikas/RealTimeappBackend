var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    title: String,
    content: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Data', schema);