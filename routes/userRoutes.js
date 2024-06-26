//requires? express, bodayparser,jsonwebtoken,nodemailer
const express = require("express");
const {register,validate} = require("../controller/appController.js");
const router = express.Router()


//register
router.post("/register",register);



//validate
router.post("/validate-otp",validate);

//login


//update

//additional path for user details



module.exports = router;