// Create server.js File

// Import express
const express = require('express');
// Import db connection
const db = require('./config/connection');

// Set up app and port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require('./routes');

// Check if the server is running
db.once('open', () => {
    app.listen(PORT, () => console.log(`This application is now listening on localhost:${PORT}`));
});