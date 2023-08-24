// Create a Reaction Schema

// Require Mongoose for creating the schema
const mongoose = require('mongoose');

// Create a Reaction Schema
const ReactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    // Use toJSON to tell the schema to use getters
    toJSON: {
        getters: true
    },
    id: false
});

// Export the Reaction Schema
module.exports = ReactionSchema;