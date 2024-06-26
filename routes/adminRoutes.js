const express = require("express");
const {register,login,viewAllUsers,viewUser,deleteUser} = require("../controller/adminController.js");
const {adminAuth} = require("../middleware/auth.js");
const router = express.Router()


//admin register
router.post("/register",register);

//admin login
router.post("/login",login);

//admin view all users
router.get("/users",adminAuth,viewAllUsers);
//admin view a certain user
router.get("/user/:username",adminAuth,viewUser);
//admin delete user
router.delete("/user/:username",adminAuth,deleteUser);


module.exports = router;