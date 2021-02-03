'use strict'

const connectToDatabase = require('../../lib/db');
const User = require('../../models/User');
const { verify } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async function(event, context, callback) {
    try {
        let body = JSON.parse(event.body);
        connectToDatabase();

        console.log(body);
        
        /**
         * verify the token
         * fetch the user password,created_at
         * update the password
         * */

        const token = body.token;
        
        const user = await User.findById(body.id);
        if (!user) return callback(null, { statusCode: 200, body: JSON.stringify({ error: "error occurred" })});
        
        const secret = `${user.password}-${user.created_at}`;
        try {
            verify(token, secret);
        } catch(error) {
            return callback(null, { statusCode: 200, body: JSON.stringify({ error: "Link Expired" })});
        }

        // change the password
        try {
            // hash the password

            const salt = bcrypt.genSaltSync(10);
            const newPassword = bcrypt.hashSync(body.password, salt);

            await User.findByIdAndUpdate(user.id, {password: newPassword});
            console.log(user.id, user.password, 'done');
            return callback(null, { statusCode: 200, body: JSON.stringify({ message: "done" })});
        } catch(error) {
            return callback(null, { statusCode: 200, body: JSON.stringify({ error: "error occurred 3" })});
        }

    } catch(error) {
        callback(null, { statusCode: error.statusCode });
        console.log(error);
    }
}