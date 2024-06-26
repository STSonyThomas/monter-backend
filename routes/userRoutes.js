//requires? express, bodayparser,jsonwebtoken,nodemailer
const express = require("express");
const {register,validate,userLogin} = require("../controller/appController.js");
const router = express.Router()


//register
router.post("/register",register);



//validate
router.post("/validate-otp",validate);

//login
router.post("/login",userLogin);

//update

//additional path for user details



module.exports = router;