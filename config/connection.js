// Require Mongoose
const { connect, connection } = require('mongoose');

// Connect to MongoDB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmediaDB';

connect(connectionString);

module.exports = connection;