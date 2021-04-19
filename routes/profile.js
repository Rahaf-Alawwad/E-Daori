const express = require('express');

const router = express.Router();
const User = require("../models/User");
const Match = require("../models/Match");
const bcrypt = require("bcrypt");
const salt = 10;

var methodOverride = require('method-override');
router.use(methodOverride('_method'))


router.get("/profile", (req, res) => {

    User.findById(req.user.id).then(result => {
        res.render("profile/index", { result });
    }).catch(err => {
        console.log(err);
    })
})


router.get("/profile/edit", (req, res) => {

    User.findById(req.user.id).then(result => {
        res.render("profile/edit", { result });
    }).catch(err => {
        console.log(err);
    })
})


router.post("/profile/edit", (req, res) => {

    User.findByIdAndUpdate(req.user.id, req.body).then(() => {
        res.redirect('/profile');
    }).catch(err => {
        console.log(err);
    });
})


router.get("/edit/Password", (req, res) => {

    res.render("profile/Password");

})


router.post("/edit/Password", (req, res) => {
    if (req.user.verifyPassword(req.body.password_old)) {
        if (req.body.password_new == req.body.password_varify) {


            let hash = bcrypt.hashSync(req.body.password_new, salt);

            console.log(hash);


            User.findByIdAndUpdate(req.user.id, { password: hash }).then(result => {
                console.log("password edit");
                res.redirect("/edit/Password")


            }).catch(err => {
                console.log(err);

            });
        } else {
            console.log("password mismatch")
            res.render("profile/Password");
        }
    } else {
        console.log("password does not match the old password")
        res.render("profile/Password");
    }
})


router.delete("/profile/edit/delete", (req, res) => {
    User.findById(req.user)
        .then(() => {
            Match.findByIdAndUpdate(req.query.id,
                { $pull: { votes :{ user: req.user }}}) 
                res.redirect("/profile/edit")
        })
        .catch (err => {
        console.log(err)
})
})


module.exports = router;
