const User = require("../models/user.js");

module.exports.renderSignUpform = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.SignUp = async (req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await  User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next();
            }
            req.flash("success","Welcome to WanderLust!");
        res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogInform = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.LogIn = async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.LogOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out!")
        res.redirect("/listings");
    });
}