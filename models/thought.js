// Create a Thought Model

// Require Mongoose Schema and Model
const { Schema, model } = require('mongoose');
// Import the reaction schema
const ReactionSchema = require('./Reaction');

// Create Thought Schema
const ThoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minLength: 1, 
            maxLength: 280 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        username: { 
            type: String, 
            required: true 
        },
        // Use the ReactionSchema to validate data for a reply
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// Create a Thought model using the ThoughtSchema
const Thought = model("thought", ThoughtSchema);

// Export the Thought model
module.exports = Thought;