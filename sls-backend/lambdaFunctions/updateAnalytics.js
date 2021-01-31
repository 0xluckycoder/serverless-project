'use strict'

const connectToDatabase = require('../lib/db');
require('dotenv').config();

const Post = require('../models/Post');

// @desc Update Post
// @path POST /dev/posts/analytics
// @authorization Public
module.exports = async function(event, context, callback) {
    try {
        const id = event.pathParameters.id;
        let body = JSON.parse(event.body);
        connectToDatabase();
        
        await Post.findByIdAndUpdate(id, { analytics: body });
        callback(null, {statusCode: 200, body: JSON.stringify({
            message: 'success'
        })});

    } catch(error) {
        console.log(error);
        callback(null, {statusCode: 500, body: JSON.stringify({error: 'server error'})});
    }
}