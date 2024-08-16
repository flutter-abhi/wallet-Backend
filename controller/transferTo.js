const User = require("../schema/User"); // Assume you have a User model
const Transaction = require('../schema/Transiction'); // Assume you have a Transaction model

exports.transferTo = async (req, res) => {
    try {
        const { amount, receiver } = req.body;
        const sender = req.user.id;
        // Validate the user IDs and amount
        if (!sender || !receiver || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Find the sender and receiver users
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        // Check if both users exist
        if (!senderUser || !receiverUser) {
            return res.status(404).json({ message: 'Sender or receiver not found' });
        }

        // Check if sender has sufficient balance
        if (senderUser.walletBalance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Perform the transfer
        senderUser.walletBalance -= amount;
        receiverUser.walletBalance += amount;

        // Save the updated user balances
        await senderUser.save();
        await receiverUser.save();

        // Record the transaction (optional, depending on your implementation)
        const transaction = new Transaction({
            sender: senderUser._id,
            receiver: receiverUser._id,
            amount: amount,
        });

        await transaction.save();
        transaction = await transaction.populate('Sender').exec();

        // Respond with a success message
        res.status(200).json({ message: 'Transfer successful', transaction });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
