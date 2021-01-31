'use strict'

const connectToDatabase = require('../../lib/db');
require('dotenv').config();
const { verify } = require('jsonwebtoken');
const User = require('../../models/User');

// @desc Confirm Email
// @path GET /dev/posts/confirmation/{token}
// @authorization Public
module.exports = async function(event, context, callback) {
    try {
        const { token } = event.pathParameters;
        connectToDatabase();

        const decoded = verify(token, 'emailSecret');

        await User.findByIdAndUpdate(decoded.userId, {
            confirmed: true
        });

        const response = {
            statusCode: 301,
            headers: {
                Location: 'http://localhost:8000/ads/sign-in'
            }
        };

        callback(null, response);

    } catch(error) {
        console.log(error);
        callback(null, {statusCode: 500, body: JSON.stringify({ error: 'server error' })});
    }
}