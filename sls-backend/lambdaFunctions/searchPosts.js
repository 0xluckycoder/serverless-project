'use strict'

const connectToDatabase = require('../lib/db');
const Post = require('../models/Post');

// @desc Get Single User
// @path GET /search/posts?key=value
// @authorization Public
module.exports = async function(event, context, callback) {
    try {
        connectToDatabase();
        const { queryStringParameters } = event;
        const posts = await Post.find(queryStringParameters);
        callback(null, {statusCode: 200, body: JSON.stringify(posts)});
      } catch(error) {
        console.log(error);
        callback(null, {statusCode: 500, body: JSON.stringify({error: 'server error'})});
      }
}