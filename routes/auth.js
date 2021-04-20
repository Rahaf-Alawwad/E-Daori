const express = require('express');

const router = express.Router();
const bcrypt = require("bcrypt");
const salt =10; //Math.random();

let passport = require("../helper/ppConfig")

const User = require("../models/User");

router.get('/auth/signup', (req, res) => {
    res.render("user/signup")
})

// HTTP GET - ROOT ROUTE OF OUR APPLICATION
router.post('/auth/signup', (req, res) => {
let newUser = new User(req.body);

let hash = bcrypt.hashSync(req.body.password, salt);
newUser.password = hash;

newUser.save().then(user=>{
    res.redirect("/test");
}).catch(err=>{
    console.log(err);
})
});


router.get('/auth/signin', (req, res) => {
    res.render("user/signin")
})

router.post(
    "/auth/signin",
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/auth/signin"
    })
  );


router.get("/auth/logout", (req, res) => {
    req.logout();
    // req.flash("error", "You are logged out successfully.");
    res.redirect("/auth/signin");
  });



module.exports = router;