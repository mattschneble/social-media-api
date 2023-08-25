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
            // If there is an error, send it to the client
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
        },

    // Get a user by ID
    getOneUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('friends')
            .populate('thoughts')
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user was found with this id. Check your ID and try again.' });
                    return;
                }
                // Otherwise, send the data
                res.json(dbUserData);
            })
            // If there is an error, send it to the client
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        },
    
    // Create a user
    createUser({ body }, res) {
        User.create(body)
        // If the data is created, send the data
            .then(dbUserData => res.json(dbUserData))
            // If there is an error, send it to the client
            .catch(err => res.status(500).json(err));
        },

    // Update a User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            body, {new: true, runValidators: true})
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({message: 'No user was found with this id. Check your ID and try again.'});
                    return;
                }
                // Otherwise, send the data
                res.json(dbUserData);
            })
            // If there is an error, send it to the client
            .catch(err => res.status(500).json(err));
        },

    // Add a friend
    addFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, 
            runValidators: true }
        )
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({message: 'No user was found with this id. Check your ID and try again.'});
                return;
            }
            // Otherwise, send the data
            res.json(dbUserData);
        })
        // If there is an error, send it to the client
        .catch(err => res.status(500).json(err));
    },
}