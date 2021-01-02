const jwt = require('jsonwebtoken');

module.exports = signToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
}