require('dotenv').config();

const express = require("express");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const expresslayouts = require("express-ejs-layouts");

const app = express();

app.use(express.static("public"));

app.use(expresslayouts);

app.set("view engine", "ejs");

app.use(require('./routes/index'));




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

  app.listen(PORT, () => {
    console.log(`Running on PORT  ${PORT}`);
  });
