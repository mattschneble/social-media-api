// Import express router
const router = require('express').Router();
const apiRoutes = require('./api');

// Set up router middleware
router.use('/api', apiRoutes);

// Export the router
module.exports = router;