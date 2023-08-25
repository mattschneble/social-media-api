// Create routes for thoughts

// Import express router
const router = require('express').Router();

// Import the thought controller
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    createReaction,

} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export the router
module.exports = router;