const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 20,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 20,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,

    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    walletBalance: {
        type: Number,
        default: 100,
    },
    type: {
        type: String,
        require: true
    },

});

// Export the User model
module.exports = mongoose.model("User", UserSchema);