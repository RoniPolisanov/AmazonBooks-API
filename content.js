var mongoose = require('mongoose'),
    content = new mongoose.Schema({
        Name: String,
        Author: { type: String, require: true, index: 1 },
        Language: String,
        "Publish Date": String,
        "Product Code": String,
        "Purchase Link": String
    });

module.exports = content;