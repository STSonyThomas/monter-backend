//requires? express, bodayparser,jsonwebtoken,nodemailer
const express = require("express");
const {register,validate,userLogin,updateUser,userProfile} = require("../controller/appController.js");
const {auth} = require("../middleware/auth.js");
const router = express.Router()


//register
router.post("/register",register);



//validate
router.post("/validate-otp",validate);

//login
router.post("/login",userLogin);

//update
router.put("/update",auth,updateUser)
//additional path for user details
router.get("/profile",auth,userProfile)


module.exports = router;