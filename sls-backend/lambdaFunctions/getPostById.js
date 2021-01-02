'use strict';

const connectToDatabase = require('../lib/db');
const Post = require('../models/Post');

// @desc Get Single Post
// @path GET /dev/:id
// @authorization Public
module.exports = async function(event, context, callback) {
    try {
        connectToDatabase();
        const id = event.pathParameters.id;
        const post = await Post.findById(id).exec();
        callback(null, { statusCode: 200, body: JSON.stringify({ post }) });
    } catch(error) {
        callback(null, { statusCode: 404, body: JSON.stringify(error) });
    }
}