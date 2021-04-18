const express = require('express');
const router = express.Router();
const axios = require("axios");
let quizzes = require("../public/quiz.json")




router.get("/quiz/index", (req, res) => {

    res.render("quiz/index" , {quizzes});

})

module.exports = router;