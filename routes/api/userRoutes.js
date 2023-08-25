// Create routes for users

// Import express router
const router = require('express').Router();

// Import the user controller
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    addFriend,
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser);
router.route('/:userId/friends/:friendId').post(addFriend);

// Export the router
module.exports = router;