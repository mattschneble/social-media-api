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
    removeFriend,
    removeUser

} = require('../../controllers/userController');

// Set up GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Export the router
module.exports = router;