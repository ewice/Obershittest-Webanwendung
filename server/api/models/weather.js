const mongoose = require('mongoose');

const weatherSchema = mongoose.Schema({
    userId: String,
    zip: String,
    automaticLocation: Boolean
    
});

module.exports = mongoose.model('Weather', weatherSchema);