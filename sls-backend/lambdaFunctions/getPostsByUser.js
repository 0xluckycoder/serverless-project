'use strict';

const connectToDatabase = require('../lib/db');
const Post = require('../models/Post');
const checkAuthorization = require('../lib/checkAuthorization');

// @desc Get Post By User
// @path GET /dev/postsByUser
// @authorization Private
module.exports = async function (event, context, callback) {
    try {
        connectToDatabase();
        const { user } = await checkAuthorization(event.headers);
        const fetchedPost =  await Post.find({ owner: user.id });
        callback(null, {statusCode: 200, body: JSON.stringify(fetchedPost)})
    } catch(error) {
        console.log(error);
        callback(null, {statusCode: 200, body: JSON.stringify(error)});
    }
}