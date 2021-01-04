const jwt = require('jsonwebtoken');

module.exports = function checkAuthorization(headers) {
    return new Promise((resolve, reject) => {
        const accessToken = headers['x-auth-token'];
        if (!accessToken) {
            reject({ error: 'token unavailable'});
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            resolve({ user: decoded });
        } catch(error) {
            reject({ error: 'invalid token' });
        }
    });
}