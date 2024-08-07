
const User = require("../schema/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

require("dotenv").config();


exports.login = async (req, res) => {

    try {
        const { contact, password } = req.body;

        if (!password || typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long "
            });
        }
        if (!contact || typeof contact !== 'string' || !/^\d{10,15}$/.test(contact)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid contact number with 10 to 15 digits."
            });

        }


        //already exist or not
        let user = await User.findOne({ contact });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            });
        }

        ///password hashing 
        if (!(await bcrypt.compare(password, user.password))) {

            return res.status(403).json({
                success: false,
                message: "Password not match "
            })
        }
        const payload = {
            contact: user.contact,
            id: user._id,
        }

        user.password = undefined;
        let token = jwt.sign(payload, process.env.JWT_SECREATE_KEY, { expiresIn: "24h" });

        return res.status(200).json({
            success: true,
            token: token,
            user: user,
            message: "user Login successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            succsses: false,
            message: "server side error during login"
        })
    }
}
