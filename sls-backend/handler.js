'use strict'

module.exports.createUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/auth/createUser')(event, context, callback);
}

module.exports.login = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/auth/login')(event, context, callback);
}

module.exports.confirmEmail = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/auth/confirmEmail')(event, context, callback);
}

module.exports.resendLink = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/auth/resendLink')(event, context, callback);
}

module.exports.getUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/auth/getUser')(event, context, callback);
}

module.exports.sendPasswordReset = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/auth/sendPasswordReset')(event, context, callback);
}

module.exports.verifyPasswordReset = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/auth/verifyPasswordReset')(event, context, callback);
}

// post methods

module.exports.createPost = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/createPost')(event, context, callback);
}

module.exports.getPosts = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/getPosts')(event, context, callback);
}

module.exports.getPostsByUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/getPostsByUser')(event, context, callback);
}

module.exports.updatePost = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/updatePost')(event, context, callback);
}

module.exports.getPostById = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/getPostById')(event, context, callback);
}

module.exports.searchPosts = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/searchPosts')(event, context, callback);
}

module.exports.updateAnalytics = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/updateAnalytics')(event, context, callback);
}

module.exports.getPostsByLocation = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  require('./lambdaFunctions/getPostsByLocation')(event, context, callback);
}

// module.exports.hello = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };