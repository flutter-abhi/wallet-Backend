const { default: mongoose } = require("mongoose");

const TransictionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: String,
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date: {
        type: Date,
        default: Date.now(),
    },

    transactionNo: {
        type: String,
        unique: true,
        required: true,
        default: () => Math.random().toString().slice(2, 17)
    },
    isCreadited: {
        type: Boolean
    }
});

module.exports = mongoose.model("Transiction", TransictionSchema);
