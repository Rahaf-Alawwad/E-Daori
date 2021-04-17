require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const expresslayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const fetch = require('node-fetch')
//let myHeaders = require('header');
const axios = require("axios");

mongoose.connect(
    process.env.mongoDBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    () => {
      console.log("Mongodb connected seccessfully!!!");
    }
  );
app.set("view engine", "ejs");
app.use(expresslayouts);


app.use(express.urlencoded({extended:false}))
app.use(express.static("public"));

let session = require('express-session');
let passport = require('./helper/ppConfig');

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 86400}
}))

app.use(passport.initialize());
app.use(passport.session());


// Sharing information to other pages
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use(require('./routes/home'))
app.use(require('./routes/profile'))



app.get('/' , (req ,res ) => {

if (req.user) {
    res.redirect('/auth/signup')
}else {
    res.redirect('/fetch')
}

})





  app.listen(PORT, () => {
    console.log(`Running on PORT  ${PORT}`);
  });
