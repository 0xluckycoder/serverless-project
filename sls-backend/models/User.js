const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
}

const UserSchema = new Schema({
    email: requiredString,
    password: requiredString,
    confirmed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: String,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;