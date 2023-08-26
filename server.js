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
app.use(require('./routes/index'))

// Check if the server is running
db.once('open', () => {
    app.listen(PORT, () => console.log(`This application is now listening on localhost:${PORT}`));
});