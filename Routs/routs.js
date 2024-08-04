

const express = require("express");
const router = express.Router()
const { sendOtp, verifyOtp } = require("../controller/sendOtp");
const { signUp } = require("../controller/signUp");
const { login } = require("../controller/loginController");
const { auth } = require("../middleware/auth");
const { isLoggedIn } = require("../controller/isLoggedIn");
const { transferTo } = require("../controller/transferTo");
const {transactionHistory} = require("../controller/transactionHistory")


router.post("/sendOTP", sendOtp);
router.post("/verifyOTP", verifyOtp);
router.post("/signUp", signUp)
router.post("/login", login)

router.get("/isLoggedIn", auth, isLoggedIn)

///transaction
router.post("/transferTo", auth, transferTo);

///history
router.get("/transactionHistory", auth, transactionHistory);


module.exports = router;



