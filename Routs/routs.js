

const express = require("express");
const router = express.Router()
const { sendOtp, verifyOtp } = require("../controller/sendOtp");
const { signUp } = require("../controller/signUp");
const { login } = require("../controller/loginController");
const { auth } = require("../middleware/auth");
const { isLoggedIn } = require("../controller/isLoggedIn");
const { transferTo } = require("../controller/transferTo");
const { transactionHistory } = require("../controller/transactionHistory")
const { editProfile } = require("../controller/EditProfile");
const { getAllContact } = require("../controller/getAllUser");
const { getBiller } = require("../controller/getallBiller");
const { addBank, getBank } = require("../controller/addBank");




router.post("/sendOTP", sendOtp);
router.post("/verifyOTP", verifyOtp);
//router.post("/signUp", signUp)
router.post("/login", login)
router.get("/isLoggedIn", auth, isLoggedIn);
router.post("/editProfile", auth, editProfile);

//
router.get("/getAllContact", auth, getAllContact);
router.get("/getBiller", auth, getBiller);

///transaction
router.post("/transferTo", auth, transferTo);

///history
router.get("/transactionHistory", auth, transactionHistory);
//
//add bank
router.post("/addBank", auth, addBank);
router.get("/getBank", auth, getBank)
module.exports = router;



