'use strict'

const connectToDatabase = require('../../lib/db');
const signToken = require('../../lib/signToken');
const sendEmailVerifyLink = require('../../lib/sendEmailVerifyLink');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
// const { SES } = require('aws-sdk');
// const ses = new SES({ region: "ap-south-1" });

// @desc Create User
// @path POST /dev/users
// @authorization Public
module.exports = async function (event, context, callback) {
    try {
        let body = JSON.parse(event.body);
        connectToDatabase();
    
        if (!body.email || !body.password) {
          return callback(null, {
            statusCode: 400,
            body: JSON.stringify({ error: "please fill all fields" })
          });
        }
    
        const user = await User.findOne({ email: body.email });
        if (user) {
          return callback(null, {
            statusCode: 400,
            body: JSON.stringify({ error: "user already exists" })
          });
        }
    
        const newUser = new User({
          email: body.email,
          password: body.password
        });
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
    
        const savedUser = await User.create(newUser);
        const accessToken = signToken(savedUser._id);

        await sendEmailVerifyLink(savedUser);
    
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify({ accessToken, savedUser })
        });
    
      } catch(error) {
        callback(null, { statusCode: error.statusCode })
        console.log(error);
      }
}