'use strict'

const Joi = require('joi');
require('dotenv').config();
const connectToDatabase = require('../lib/db');
const checkAuthorization = require('../lib/checkAuthorization');
const imageUploader = require('../lib/imageUploader');
const Post = require('../models/Post');
const User = require('../models/User');

// @desc Create Post
// @path POST /dev/posts
// @authorization Private
module.exports = async function(event, context, callback) {
    try {
        let body = JSON.parse(event.body);
        connectToDatabase();

        try {
            const { user } = await checkAuthorization(event.headers);
            const fetchedUser = await User.findById(user.id).select('-password');    
            body.owner = fetchedUser._id;
        } catch(error) {
            callback(null, {statusCode: 401, body: JSON.stringify({ error: error.error })});
        }

        // upload media
        if (body.slide && body.thumbnail) {
            const { slide, thumbnail } = await imageUploader(body.slide, body.thumbnail);
            body.slide = slide;
            body.thumbnail = thumbnail;
        }

        // validate schema
        const schema = Joi.object({
            brandName: Joi.string().min(2).max(15).required(),
            category: Joi.string().min(2).max(25).required(),
            number: Joi.number().required(),
            owner: Joi.string().required(),
            analytics: Joi.number().max(50).required(),
            website: Joi.string().allow('').max(50),
            facebook: Joi.string().allow('').max(50),
            instagram: Joi.string().allow('').max(50),
            twitter: Joi.string().allow('').max(50),
            thumbnail: Joi.string().required(),
            slide: Joi.array().items(Joi.string()).max(5),
            branches: Joi.array().items({
                branchLocation: Joi.string().max(60).required(),
                district: Joi.string().required()  
            }).max(5)
        });

        const options = {
            abortEarly: false,
            allowUnknown: true
        }

        const { error, value } = schema.validate(body, options);

        if (error) {
            // send validate error
            callback(null, {statusCode: 422, body: JSON.stringify({
                error: 'validation error'
            })});
            console.log(error);
        }

        // save in database
        const newPost = new Post(value);
        const createdPost = await newPost.save();
        console.log(createdPost);
        callback(null, {statusCode: 200, body: JSON.stringify(createdPost)});

    } catch(error) {
        callback(null, { statusCode: 500, body: JSON.stringify({ error: 'server error' })});
        console.log(error);
    }
}