require("dotenv").config();
const User = require("../schema/User");
const jwt = require("jsonwebtoken");


exports.auth = (req, res, next) => {
    try {
        console.log("body:  " + req.body.token)
        console.log("header:  " + req.header("Authorization"))

        const token = req.body.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: "invalid token"
            })
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECREATE_KEY)
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                message: "token expire logine agai"
            })
        }


        next();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error during token verfication"
        })
    }
}

