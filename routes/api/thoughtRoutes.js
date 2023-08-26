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
    removeThought,
    removeReaction

} = require('../../controllers/thoughtController');

// Set up GET all and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(removeThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// Export the router
module.exports = router;