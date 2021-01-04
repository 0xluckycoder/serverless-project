'use strict'

const connectToDatabase = require('../lib/db');
const User = require('../models/User');
const checkAuthorization = require('../lib/checkAuthorization');

// @desc Get Single User
// @path GET /dev/auth
// @authorization Private
module.exports = async function(event, context, callback) {
    try {
        connectToDatabase();
        const { user } = await checkAuthorization(event.headers);
        const fetchedUser = await User.findById(user.id).select('-password');
        callback(null, {statusCode: 200, body: JSON.stringify({ user: fetchedUser })});
      } catch(error) {
        console.log(error);
        callback(null, {statusCode: 401, body: JSON.stringify(error)});
      }
}