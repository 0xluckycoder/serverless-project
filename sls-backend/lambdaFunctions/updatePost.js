'use strict';
const connectToDatabase = require('../lib/db');
const imageUploader = require('../lib/imageUploader');
require('dotenv').config();

const Post = require('../models/Post');

// @desc Update Post
// @path PUT /dev/posts
// @authorization Private
module.exports = async function(event, context, callback) {
    try {
        // update only if available in body
        let body = JSON.parse(event.body);
        const id = event.pathParameters.id;
        connectToDatabase();

        try {
            await checkAuthorization(event.headers);
        } catch(error) {
            callback(null, {statusCode: 401, body: JSON.stringify({ error: error.error })});
        }

        // upload media if available in body to update
        if (body.slide && body.thumbnail) {
            const { slide, thumbnail } = await imageUploader(body.slide, body.thumbnail);
            body.slide = slide;
            body.thumbnail = thumbnail;
        }

        await Post.findByIdAndUpdate(id, body);
        callback(null, {statusCode: 200, body: JSON.stringify({
            message: 'success'
        })});

    } catch(error) {
        console.log(error);
        callback(null, {statusCode: 500, body: JSON.stringify({error: 'server error'})});
    }
}