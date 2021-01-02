const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
}

const PostSchema = new Schema({
    brandName: requiredString,
    category: requiredString,
    number: requiredString,
    owner: requiredString,
    analytics: {
        type: Number,
        required: true
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },
    offer: {
        type: Boolean,
        default: false
    },
    website: {
        type: String,
    },
    thumbnail: requiredString,
    slide: [String],
    branches: [{
        branchLocation: requiredString,
        district: requiredString
    }]
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;