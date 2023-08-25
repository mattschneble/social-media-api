// Create controllers for thoughts

// Import necessary models
const { Thought, User } = require('../models');

// Create the thought controller
const thoughtController = {

    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            // If there is an error, send it to the client
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
        },

    // Get one thought by ID
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought was found with this id. Check your ID and try again.' });
                    return;
                }
                // Otherwise, send the data
                res.json(dbThoughtData);
            })
            // If there is an error, send it to the client
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        },

    // Create a thought
    createThought({ body }, res) {
        Thought.create(body)
        // If the data is created, send the data
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
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
                    .catch(err => res.json(err));
            })
            // If there is an error, send it to the client
            .catch(err => res.status(500).json(err));
        },

    // Update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No user was found with this id. Check your ID and try again.' });
                    return;
                }
                // Otherwise, send the data
                res.json(dbThoughtData);
            })
            // If there is an error, send it to the client
            .catch(err => res.status(500).json(err));
        },

        // Create a reaction
        createReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
            // If the data is created, send the data
                .then(dbThoughtData => {
                    // If no thought is found, send 404
                    if (!dbThoughtData) {
                        res.status(404).json({ message: 'No thought was found with this id. Check your ID and try again.' });
                        return;
                    }
                    // Otherwise, send the data
                    res.json(dbThoughtData);
                })
                // If there is an error, send it to the client
                .catch(err => res.json(err));
            },
}