'use strict';

const connectToDatabase = require('../lib/db');
const signToken = require('../lib/signToken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { SES } = require('aws-sdk');
const ses = new SES({ region: "ap-south-1" });

const jwt = require('jsonwebtoken');

const sendEmailVerifyLink = (user) => {
  return new Promise( async (resolve) => {

    const emailToken = jwt.sign({userId: user._id}, 'emailSecret', { expiresIn: '1d' });
    const url = `http://localhost:3000/dev/posts/confirmation/${emailToken}`;
    
    const params = {
      Source: "Lakshan Perera <lakshanperera625@gmail.com>",
      Destination: { ToAddresses: [user.email] },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `Hello \nContent: This is the content \n ${url}`
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Verification Email`
        }
      }
    }

    try {
      const data = await ses.sendEmail(params).promise();
      console.log('email sent 📧', data);
      resolve();
    } catch (error) {
      console.log('emaill errorr', error)
    }
  });
}

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