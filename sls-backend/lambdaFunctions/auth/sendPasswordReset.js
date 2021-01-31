'use strict'

const connectToDatabase = require('../../lib/db');
const User = require('../../models/User');
const { sign } = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const signPasswordResetToken = (attributes) => {
    const payload = {
        id: attributes.id,
        email: attributes.email
    }
    const secret = `${attributes.password}-${attributes.created_at}`;
    return sign(payload, secret, { expiresIn: 3600*24 });
}

const sendPasswordResetLink = (user, url) => {
    return new Promise(async (resolve) => {
        const mailTemplate = {
            to: user.email,
            from: 'Hotboxes.lk@gmail.com',
            subject: 'hotbox.lk Password Reset',
            text: 'password reset text',
            html: `<a href="${url}">click here to reset your password</a>`
        }

        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

        try {
            await sgMail.send(mailTemplate);
            resolve();
        } catch(error) {
            console.log('email error', error);
        }
    })
}

module.exports = async function (event, context, callback) {
    try {
        let body = JSON.parse(event.body);
        connectToDatabase();

        const attributes = await User.findOne({ email: body.email });
        // throw an error if email is not available

        if (!attributes) return callback(null, {
            statusCode: 400,
            body: JSON.stringify({ error: 'no user with that email' })
        });

        const token = signPasswordResetToken(attributes);

        const url = `http://localhost:8000/ads/changePassword/${token}/${attributes.id}`;

        await sendPasswordResetLink(attributes, url);

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: 'Password Reset Email is Sent' })
        });

        /**
         * step 1
         * get user's password & created_at date attributes by their email
         * sign token using [password + created_at] as jwt secret
         * send email with generated url
         * 
         * step 2
         * decode and verify the token
         * redirect user to the password reset form (front end task)
         * front end form will hold the token
         * again decode the token reset the password 
         *
         * Test
         * fix all the possible errors that can happen
        */
    
    } catch(error) {
        callback(null, { statusCode: error.statusCode });
        console.log(error);
    }
}