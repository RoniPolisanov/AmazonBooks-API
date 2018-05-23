var mongoose = require('mongoose'),
    content = require('./content'),
    use = new mongoose.Schema({
        "Language": { type: String, index: 1, required: true },
        "Books": [content]
    });

//console.log(`required paths: ${user.requiredPaths()}`);
//console.log(`indexes: ${JSON.stringify(user.indexes())}`);

var Use = mongoose.model('Use', use);
module.exports = Use;