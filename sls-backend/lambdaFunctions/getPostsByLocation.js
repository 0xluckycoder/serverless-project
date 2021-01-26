'use strict'

const connectToDatabase = require('../lib/db');
const Post = require('../models/Post');

// @desc Get Single User
// @path GET {location}/posts
// @authorization Public
module.exports = async function(event, context, callback) {
    try {
        connectToDatabase();
        const { location } = event.pathParameters;

        const posts = await Post.find({
            'branches': {
                $elemMatch: {
                    "district": `${location}`
                }
            }
        });

        callback(null, {statusCode: 200, body: JSON.stringify(posts)});
      } catch(error) {
        console.log(error);
        callback(null, {statusCode: 500, body: JSON.stringify({error: 'server error'})});
      }
}