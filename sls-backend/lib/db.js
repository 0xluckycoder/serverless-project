const mongoose = require('mongoose');

require('dotenv').config();
mongoose.Promise = global.Promise;

let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('using existing database connection');
    return Promise.resolve();
  }

  console.log('using new database connection');
  return mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(db => {
        isConnected = db.connections[0].readyState
    });
}