


const Bank = require("../schema/Bank");

exports.addBank = async (req, res) => {
    try {
        const _id = req.user.id;
        const { cardName, acNumber, acBalance, valid } = req.body;

        // Basic validations
        if (!cardName || !acNumber || acBalance == null || !valid) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const rescard = await Bank.create({
            user: _id,
            cardName,
            acNumber,
            acBalance,
            valid
        });

        res.status(200).json({
            message: "Bank added successfully",
            bank: rescard
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error during creating bank record"
        });
    }
}


exports.getBank = async (req, res) => {
    try {
        const _id = req.user.id;

        const banks = await Bank.find({ user: _id });


        res.status(200).json({
            message: "bank add succesfully",
            bank: banks
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error during creating message"
        })
    }
}