// Import necessary modules
const crypto = require('crypto');
const OTP = require("../schema/OTP");
const twilio = require('twilio');
require('dotenv').config();

// Function to send OTP
exports.sendOtp = async (req, res) => {
    try {
        const { contact } = req.body;

        // Check if contact is provided and is a number with 12 digits
        if (!contact) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid contact number with 12 digits."
            });
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Initialize Twilio client
        const client = new twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        // Sending OTP
        try {
            const message = await client.messages.create({
                body: `Your Tap'n Pay Wallet OTP is ${otp}.
                 Please use this code to complete your transaction.
                  This OTP is valid for 1 minutes.`,
                to: `+${contact}`,
                from: process.env.TWILIO_PHONE_NUMBER,
            });

            console.log('OTP sent successfully:', message.sid);
        } catch (error) {
            console.error('Error sending OTP:', error);
            return res.status(500).json({
                success: false,
                message: "Error occurred during sending OTP."
            });
        }

        // Store the OTP and contact in the database
        const response = await OTP.create({ otp, contact });
        console.log(response);

        // Return success response
        return res.status(200).json({
            success: true,
            message: `OTP sent successfully to ${contact}`,
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the OTP."
        });
    }
};

// Function to verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { otp, contact } = req.body;

        // Check if OTP is provided
        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "Please enter the OTP."
            });
        }

        // Find the most recent OTP entry for the given contact
        const dbOtp = await OTP.find({ contact }).sort({ createdAt: -1 }).limit(1);

        

        // Check if OTP was found and compare it with the provided OTP
        if (dbOtp.length > 0 && dbOtp[0].otp === otp) {
            return res.status(200).json({
                success: true,
                message: "OTP verified successfully."
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Incorrect OTP."
            });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while verifying the OTP."
        });
    }
};
