const { default: mongoose } = require("mongoose");


const BankSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    card: {
        type: String,
        require: true
    }
    ,
    acNumber: {
        type: String,
        require: true
    },
    acBalance: {
        type: String,
    },
    ifcCode: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model("Bank", BankSchema);

