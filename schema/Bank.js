const { default: mongoose } = require("mongoose");


const BankSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    cardName: {
        type: String,
        require: true
    }
    ,
    acNumber: {
        type:Number,
        require: true
    },
    acBalance: {
        type: Number,
        require: true
    },

    valid: {
        type: String
    }
})


module.exports = mongoose.model("Bank", BankSchema);

