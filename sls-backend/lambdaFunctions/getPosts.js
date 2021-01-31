'use strict'

const connectToDatabase = require('../lib/db');
const Post = require('../models/Post');

// @desc Get All Posts
// @path GET /dev/posts
// @authorization Public
module.exports = async function(event, context, callback) {
    try {
        connectToDatabase();
        const posts = await Post.find({});
        callback(null, { statusCode: 200, body: JSON.stringify({ posts }) });
    } catch(error) {
        callback(null, { statusCode: 500, body: JSON.stringify({error: 'server error'}) });
    }
}