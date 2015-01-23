var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:30000/nodejs-blog');

var postSchema = mongoose.Schema({
    title:String,
    post:String
});

var BlogEntry = mongoose.model('BlogEntry', postSchema);

module.exports = BlogEntry;