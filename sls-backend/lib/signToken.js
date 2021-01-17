const { sign } = require('jsonwebtoken');

module.exports = signToken = (id) => {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
}