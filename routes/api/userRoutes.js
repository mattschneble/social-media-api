// Create routes for users

// Import express router
const router = require('express').Router();

// Import the user controller
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    addFriend,
} = require('../../controllers/userController');

// Set up GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser);
router.route('/:userId/friends/:friendId').post(addFriend);

// Export the router
module.exports = router;