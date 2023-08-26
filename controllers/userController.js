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

    // Get one user by ID
    getOneUser({ params }, res) {
        User.findOne({ _id: params.userId })
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
            {_id: params.userId}, 
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
        User.findOneAndUpdate(
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

    // Remove a user
    removeUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user was found with this id. Check your ID and try again.' });
                    return;
                }
                // remove the user from any existing friends arrays
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.userId } }
                )
                .then(() => {
                    // Remove any comments from this user
                    Thought.deleteMany({ username: dbUserData.username })
                        .then(() => {
                            // If the data is deleted, display a message
                            res.json({ message: 'The user has been deleted.' });
                        })
                        // If there is an error, send it to the client
                        .catch(err => res.status(500).json(err));
                })
                // If there is an error, send it to the client
                .catch(err => res.status(500).json(err));
            })
            // If there is an error, send it to the client
            .catch(err => res.status(500).json(err));
        },

    // Remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
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
    }
}

// Export the user controller
module.exports = userController;