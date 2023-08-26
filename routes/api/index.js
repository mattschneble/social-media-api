// Create file to export all routes

// Import express router
const router = require('express').Router();

// Import needed routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Set up routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export the router
module.exports = router;