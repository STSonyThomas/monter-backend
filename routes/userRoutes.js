//requires? express, bodayparser,jsonwebtoken,nodemailer
const express = require("express");
const {register} = require("../controller/appController.js");
const router = express.Router()


//register
router.post("/register",register);



//validate


//login


//update

//additional path for user details



module.exports = router;