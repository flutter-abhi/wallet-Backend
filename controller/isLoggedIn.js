const { json } = require("express")
const User = require("../schema/User");

exports.isLoggedIn = async (req, res) => {
    try {
        const contact = req.user.contact;
        const _id = req.user.id;

        const responseUser = await User.findOne({ _id });
        
        responseUser.password = undefined;

        res.status(200).json({
            success: true,
            user: responseUser,
            message: "user login already"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "errong during fetching loggin data"
        })
    }


}