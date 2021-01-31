'use strict'

const connectToDatabase = require('../../lib/db');
const sendEmailVerifyLink = require('../../lib/sendEmailVerifyLink');
const User = require('../../models/User');

// @desc Create User
// @path POST /dev/resend/{email}
// @authorization Public
module.exports = async function (event, context, callback) {
    try {
        // email will only sent to 
        connectToDatabase();
        const { email } = event.pathParameters;

        const user = await User.findOne({ email });

        if (!user) {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({ error: "Login First" })
            })
        }
        
        if (user.confirmed) {
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify({ error: "User Already Confirmed" })
            })
        }

        await sendEmailVerifyLink(user);

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent" })
        })
    
    } catch(error) {
        callback(null, { statusCode: error.statusCode })
        console.log(error);
      }
}