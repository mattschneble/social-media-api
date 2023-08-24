// Create a User Model

// Require Mongoose Schema and Model
const { Schema, model } = require('mongoose');

// Create User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
        },
    email: {
        type: String,
        required: true,
        unique: true,
        // Use RegEx to validate correct email format
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        },
    // Link to the Thought model
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "thought",
        },
    ],
    // self-reference to create a friends list
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],
},
{
    // Use virtuals
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// Create an object to hold the User model methods
const User = model("user", UserSchema);

// Export the User model
module.exports = User;