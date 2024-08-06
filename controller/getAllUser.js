
const User = require("../schema/User");

exports.getAllContact = async (req, res) => {

    try {

        const users = await User.find({ type: "user" });
        res.status(200).json({
            succsees: true,
            data: users
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server side error "
        })
    }
}