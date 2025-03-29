const express = require("express");
const router = express.Router();
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js");


router.route("/signup")
.get(usercontroller.renderSignUpform)
.post( usercontroller.SignUp);

router.route("/login")
.get(usercontroller.renderLogInform)
.post(
    saveRedirectUrl,
    passport.authenticate("local",
    {failureRedirect:"/login",
     failureFlash: true}) ,
     usercontroller.LogIn);

router.get("/logout",usercontroller.LogOut);

module.exports = router;