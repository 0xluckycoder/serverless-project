'use strict'

const connectToDatabase = require('../lib/db');
const Post = require('../models/Post');
const checkAuthorization = require('../lib/checkAuthorization');

// @desc Get Post By User
// @path GET /dev/users/{userId}/posts
// @authorization Private
module.exports = async function (event, context, callback) {
    try {
        connectToDatabase();
        const { user } = event.pathParameters;
        try {
            await checkAuthorization(event.headers);
        } catch(error) {
            callback(null, {statusCode: 401, body: JSON.stringify({ error: error.error })});
        }

        const posts = await Post.find({ owner: user });
        callback(null, {statusCode: 200, body: JSON.stringify(posts)});
    } catch(error) {
        console.log(error);
        callback(null, {statusCode: 500, body: JSON.stringify({error: 'server error'})});
    }
}