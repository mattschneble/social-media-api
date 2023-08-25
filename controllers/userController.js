// Create controller for user controller

// Import the User and Thought model
const { User, Thought } = require('../models');

// Create the user controller
const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
        },

    // Get a user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('friends')
            .populate('thoughts')
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID.' });
                    return;
                }
                // Otherwise, send the data
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
        },
    
    // Create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
        },


}