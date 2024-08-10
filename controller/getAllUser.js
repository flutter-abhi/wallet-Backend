const User = require("../schema/User");

exports.getAllContact = async (req, res) => {
    try {
        
        const users = await User.find({ type: "user" }).select('-password -walletBalance');
        
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server side error"
        });
    }
}
