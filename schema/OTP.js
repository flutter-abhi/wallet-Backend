const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    contact: {
        type: Number,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60
    }
});

module.exports = mongoose.model("OTP", OTPSchema);
