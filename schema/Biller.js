

// Biller Schema
const BillerSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        maxLength: 20,
    },
    contact: {
        type: String,
        required: true,
        maxLength: 10,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 20,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        maxLength: 20,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    walletBalance: {
        type: Number,
    },
    banks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bank"
        }
    ],
});

// Export the Biller model
module.exports = mongoose.model("Biller", BillerSchema);
