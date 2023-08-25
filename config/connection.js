// Require Mongoose
const { connect, connection } = require('mongoose');

// Connect to MongoDB
connect('mongodb://127.0.0.1:21017/socialmediaDB');

module.exports = connection;