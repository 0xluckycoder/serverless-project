'use strict'

const connectToDatabase = require('../../lib/db');
const User = require('../../models/User');
const { verify } = require('jsonwebtoken');

module.exports = async function(event, context, callback) {
    try {
        connectToDatabase();
        const { token, id } = event.pathParameters;

        const user = await User.findById(id);
        if (!user) callback(null, { statusCode: 200, body: JSON.stringify({ error: "user not found" })});
        const secret = `${user.password}-${user.created_at}`;

        try {
            const decoded = verify(token, secret);

            /** 
             * Save Data in the Frontend
             * i can set up a HttpOnly cookie with available token
             * https://aws.amazon.com/blogs/compute/simply-serverless-using-aws-lambda-to-expose-custom-cookies-with-api-gateway/
             * */ 
            // return callback(null, { 
            //     statusCode: 301, 
            //     headers: {
            //         Location: 'http://localhost:8000/ads'
            //     }, 
            //     body: JSON.stringify(decoded)
            // });
        } catch(error) {
            console.log(error);
            return callback(null, {statusCode: 401, body: JSON.stringify({ error: "link has expired" })});
        }

    } catch(error) {
        callback(null, { statusCode: error.statusCode });
        console.log(error);
    }
}