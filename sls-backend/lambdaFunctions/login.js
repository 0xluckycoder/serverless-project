'use strict';

const connectToDatabase = require('../lib/db');
const signToken = require('../lib/signToken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc User Login
// @path POST /dev/auth
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
        if (!user) {
          return callback(null, {
            statusCode: 400,
            body: JSON.stringify({ error: "user doesn't exits" })
          });
        }
    
        const passwordMatch = await bcrypt.compare(body.password, user.password);
        if (!passwordMatch) {
          return callback(null, {
            statusCode: 401,
            body: JSON.stringify({ error: 'invalid password' })
          });
        }
    
        const accessToken = signToken(user._id);
    
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify({ accessToken, user })
        });
    
      } catch(error) {
        callback(null, { statusCode: error.statusCode });
      }
}