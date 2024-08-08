const Transaction = require("../schema/Transiction");
const { broadcastTransactionUpdate } = require("../config/websocket");

exports.transactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        let history = await Transaction.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).sort({ date: -1 }).populate({
            path: 'sender',
            select: '-password -walletBalance'
        })
            .populate({
                path: 'receiver',
                select: '-password -walletBalance'
            });;

        // Iterate over each transaction to update the isCreadited field
        history = history.map(transaction => {
            if (transaction.sender.toString() === userId.toString()) {
                transaction.isCreadited = false;
            } else if (transaction.receiver.toString() === userId.toString()) {
                transaction.isCreadited = true;
            }
            return transaction;
        });

        // Send the updated transaction history via HTTP response
        res.status(200).json({
            success: true,
            data: history,
            message: "Fetching History successfully"
        });

        // Broadcast the updated transaction history to all WebSocket clients
        broadcastTransactionUpdate(history);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't fetch history, server-side problem. Please try again."
        });
    }
};
